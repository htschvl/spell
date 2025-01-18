# passo-a-passo para criação do token _*charm*_

## cria o endereço _user account_

```
solana-keygen grind --starts-with usr:1
```

> Wrote keypair to usrrSeyYtHs2Dafidje58PEn76c4mZD7qbCw8uyQLno.json

## cria o endereço _minting account_

```
solana-keygen grind --starts-with mnt:1

```

> Wrote keypair to mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9.json

## cria o token

```
spl-token create-token \
--program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
--enable-metadata --decimals 6 \
mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9.json
```

> Creating token mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 under program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
> To initialize metadata inside the mint, please run `spl-token initialize-metadata mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 <YOUR_TOKEN_NAME> <YOUR_TOKEN_SYMBOL> <YOUR_TOKEN_URI>`, and sign with the mint authority.
>
> Address: mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9
> Decimals: 6
>
> Signature: 4oXg3q9HVGJcoFUfKH2Acaba8HKbN9fCxX56b5jc9sbc9VnenjSqvonac4gNuydgprre6NDfgRAYL1jdNRrxYzt9

## associa a [metadata](https://sapphire-causal-wombat-971.mypinata.cloud/ipfs/bafkreiha3jlur45aunsug2uykqhmxy6rasp4vjyjlu4rwz4lmlfzq5uas4)

```
spl-token initialize-metadata mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 \
"Charm" "CHRM" \
"https://sapphire-causal-wombat-971.mypinata.cloud/ipfs/bafkreiha3jlur45aunsug2uykqhmxy6rasp4vjyjlu4rwz4lmlfzq5uas4"
```

> Signature: 64Dmm4EFrFk8HWixrw1H3yiTBu4jf8TaP8VQop8u3mBn8akWPxcoDQxhbqHyNaUf8PRPwVWL81PnmfLRpgeFH8rn

## create token account

```
spl-token create-account mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9
```

> Creating account 2PMDGCF18TLj3tyDhcS5wrsnpNmpqKcpJJiohybLfdJA
>
> Signature: 4m3YvVjxy2yd6vuj6h28qHSKTFeqeTqavSPpGv81g9G1ddo2fxtX3RDKPdBvyA2Fx1cD5xFA1kfvaPkk7nArmjL4

## gera os 6.000.000 tokens (mint)

```
spl-token mint mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 6000000
```

> Minting 6000000 tokens
> Token: mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9
> Recipient: 2PMDGCF18TLj3tyDhcS5wrsnpNmpqKcpJJiohybLfdJA
>
> Signature: 28NfFuXGji8kHkLYx5a5UH1iv4aNnvLUEduRuiwzggm4HX3KDkyhzbZASkbUUwut1ypYnvLxq3dXASoCazv7XKt3

[token gerado](https://explorer.solana.com/address/mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9?cluster=devnet)

## verifica o saldo

```
spl-token balance mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9
```

> 6000000

## transfere para uma [carteira](https://explorer.solana.com/address/9e1DR6JWSAppwNpZBLLRX2kvvnCeLYVUS8PcU8Xz588L?cluster=devnet)

```
spl-token transfer mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 1000000 \
9e1DR6JWSAppwNpZBLLRX2kvvnCeLYVUS8PcU8Xz588L --fund-recipient --allow-unfunded-recipient
```

> Transfer 1000000 tokens
> Sender: 2PMDGCF18TLj3tyDhcS5wrsnpNmpqKcpJJiohybLfdJA
> Recipient: 9e1DR6JWSAppwNpZBLLRX2kvvnCeLYVUS8PcU8Xz588L
> Recipient associated token account: 5JZ7qYYh4hwU3EaAU9Q6PR8PLkBDPGHq1EKpSUKnApnT
> Funding recipient: 5JZ7qYYh4hwU3EaAU9Q6PR8PLkBDPGHq1EKpSUKnApnT
>
> Signature: 3FwkpyK8fbXHaV6axUxJNsZfScfyZjNWyVj1Kh8rHzk3eKeaQorvc9xGNJtZS1aZXCqebd7zPueeodcugg3j9qJJ

## prepara para produção

```
spl-token authorize mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 mint --disable
spl-token authorize mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 freeze --disable
spl-token burn mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 100
```

## atualiza metadata

```
spl-token update-metadata mnt3S2Prwb2v3T5VSZW6RtHVRnctDnqtWBDF2TUshX9 \
uri https://sapphire-causal-wombat-971.mypinata.cloud/ipfs/bafkreiha3jlur45aunsug2uykqhmxy6rasp4vjyjlu4rwz4lmlfzq5uas4
```
