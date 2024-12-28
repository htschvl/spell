import '../styles/Circle.scss';

function Circle() {
  return (
    <div className="circle">
      <div className="text-section">
        <a href="#" className="join-link">Join the circle</a>
        <h2>CAST YOUR FIRST SPELL</h2>
        <p>
          This is for the dreamers, the believers, the ones who see beauty in broken code and magic
          in the machine. Together, we're creating something timeless in the ephemeral world of digital art.
        </p>
        <div className="icons">
          <img src="path/to/icon1.png" alt="Icon 1" />
          <img src="path/to/icon2.png" alt="Icon 2" />
        </div>
      </div>
      <div className="image-section">
        <img src="path/to/your/image.jpg" alt="Art" />
      </div>
    </div>
  );
};

export default Circle;
