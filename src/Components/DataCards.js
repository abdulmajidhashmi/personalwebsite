import { Link } from "react-router-dom";
import "./DataCards.css";

const DataCards = () => {
  return (
    <>

    <h1 className="treatments">Treatments</h1>
      <div className="disease-div">
      <Link to="/depression" className="link-reset"><div className="disease">
         
          <div >
            <h1>Depression </h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/011/411/660/non_2x/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg" />
          </div>
         
         
        </div> 
        </Link>
        <Link to="/bipolardisorder" className="link-reset" >  <div className="disease"> 
        
          <div>
            <h1>Bipolar Disorder</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/025/677/823/non_2x/woman-with-bipolar-disorder-symptom-in-flat-design-bipolar-patient-with-mood-swings-sometimes-in-a-good-mood-sometimes-sad-vector.jpg" />
          </div>
         
        </div>   </Link>
        
        
        <Link to="/pd" className="link-reset">  <div className="disease">
          <div>
            <h1>Panic Disorder</h1>
          </div>
          <div>
            <img
              className="disease-img"
              src="https://static.vecteezy.com/system/resources/previews/007/820/657/non_2x/woman-with-panic-attack-anxiety-disorder-symptoms-vector.jpg"
            />
          </div>
        </div>
        </Link>
        <Link to="/Sad" className="link-reset"> <div className="disease">
          <div>
            <h1>Social Anxiety Disorder</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/011/415/865/non_2x/social-anxiety-disorder-concept-icon-mental-issues-downside-of-social-media-abstract-idea-thin-line-illustration-isolated-outline-drawing-editable-stroke-vector.jpg" />
          </div>
        </div>
        </Link>
        <Link to="/Ocd" className="link-reset">  <div className="disease">
          <div>
            <h1>Obsessive-Compulsive Disorder</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/008/552/155/non_2x/little-girl-with-obsessive-compulsive-disorder-children-s-mental-health-illustration-in-flat-style-vector.jpg" />
          </div>
        </div>
        </Link>
        <Link to="/depression" className="link-reset">  <div className="disease">
          <div>
            <h1>Post-Traumatic Stress Disorder</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/006/031/631/non_2x/post-traumatic-stress-disorder-shocked-scared-shock-panic-surprise-face-angry-and-frustrated-fear-and-upset-for-mistake-concept-illustration-free-vector.jpg" />
          </div>
        </div>
        </Link>
        <Link to="/Phobias" className="link-reset">  <div className="disease">
          <div>
            <h1>Phobias</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/030/724/196/non_2x/man-suffers-from-phobias-and-fears-the-psychological-concept-of-mental-disorder-and-paranoia-illustration-vector.jpg" />
          </div>
        </div>
        </Link>
        <Link to="/Adhd" className="link-reset">  <div className="disease">
          <div>
            <h1>Attention Deficit Hyperactivity Disorder</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/047/646/939/non_2x/attention-deficit-hyperactivity-disorder-behavior-illustration-vector.jpg" />
          </div>
        </div>
        </Link>
        <Link to="/Asd" className="link-reset">  <div className="disease">
          <div>
            <h1>Autism Spectrum Disorder </h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/050/526/249/non_2x/asperger-syndrome-concept-illustration-design-vector.jpg" />
          </div>
        </div>
        </Link>
        <Link to="/Ld" className="link-reset">  <div className="disease">
          <div>
            <h1>Learning Disorders</h1>
          </div>
          <div>
            <img className="disease-img" src="https://static.vecteezy.com/system/resources/previews/007/718/681/non_2x/dyslexia-failing-to-read-learning-disability-concept-young-girl-difficulty-in-reading-logopedy-scattered-letters-above-her-head-and-book-illustration-vector.jpg" />
          </div>
        </div>
        </Link>
      </div>
    </>
  );
};

export default DataCards;
