import { Link } from "react-router-dom";
import "./DataCards.css";

const DataCards = () => {
  return (
    <>
      <div class="container">
        <h2 class="heading">Common Conditions</h2>
        <div class="grid-layout">
          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/411/660/non_2x/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Depression</h3>
              <p class="card-description">
                Major depressive disorder affects how you feel, think and behave
                and can lead to various emotional and physical problems.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/025/677/823/non_2x/woman-with-bipolar-disorder-symptom-in-flat-design-bipolar-patient-with-mood-swings-sometimes-in-a-good-mood-sometimes-sad-vector.jpg"
                alt="Bipolar-Disorder"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Bipolar Disorder</h3>
              <p class="card-description">
                Bipolar disorders are mental health conditions characterized by
                periodic, intense emotional states affecting a person's mood,
                energy, and ability to function.
              </p>
              <Link to="/bipolardisorder" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/007/820/657/non_2x/woman-with-panic-attack-anxiety-disorder-symptoms-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">
                Attention Deficit Hyperactivity Disorder
              </h3>
              <p class="card-description">
                Attention-deficit/hyperactivity disorder (ADHD) is a chronic
                brain-based disorder that affects a person's ability to focus,
                be still, and control their impulses.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/415/865/non_2x/social-anxiety-disorder-concept-icon-mental-issues-downside-of-social-media-abstract-idea-thin-line-illustration-isolated-outline-drawing-editable-stroke-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Anxiety disorder</h3>
              <p class="card-description">
                Anxiety disorders are mental health conditions that involve
                excessive and persistent feelings of fear, worry, and dread.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/552/155/non_2x/little-girl-with-obsessive-compulsive-disorder-children-s-mental-health-illustration-in-flat-style-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Obsessive compulsive disorder</h3>
              <p class="card-description">
                OCD is a long-term anxiety disorder that causes people to have
                unwanted, recurring thoughts (obsessions) and repetitive
                behaviors (compulsions).
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/006/031/631/non_2x/post-traumatic-stress-disorder-shocked-scared-shock-panic-surprise-face-angry-and-frustrated-fear-and-upset-for-mistake-concept-illustration-free-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Post-Traumatic Stress Disorder</h3>
              <p class="card-description">
                Post-traumatic stress disorder (PTSD) is a mental health
                condition that can develop after someone experiences or
                witnesses a traumatic event.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/030/724/196/non_2x/man-suffers-from-phobias-and-fears-the-psychological-concept-of-mental-disorder-and-paranoia-illustration-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Phobias</h3>
              <p class="card-description">
                A phobia is an intense, irrational, and uncontrollable fear of a
                specific object, situation, or activity.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/003/685/710/non_2x/mood-disorder-color-icon-manic-and-depressive-episodes-dysthymia-cyclothymia-emotional-swing-happy-and-sad-psychological-problem-psychiatric-issue-mental-health-isolated-illustration-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Mood disorder</h3>
              <p class="card-description">
                A mood disorder is a mental illness that affects a person's
                emotional state, causing them to experience long periods of
                sadness, depression, mania, or elation.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/050/526/249/non_2x/asperger-syndrome-concept-illustration-design-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Autism Spectrum Disorder</h3>
              <p class="card-description">
                Major depressive disorder affects how you feel, think and behave
                and can lead to various emotional and physical problems.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>

          <div class="card">
            <div class="card-image-wrapper">
              <img
                src="https://static.vecteezy.com/system/resources/previews/007/718/681/non_2x/dyslexia-failing-to-read-learning-disability-concept-young-girl-difficulty-in-reading-logopedy-scattered-letters-above-her-head-and-book-illustration-vector.jpg"
                alt="Depression"
                class="card-image"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">Learning disorder</h3>
              <p class="card-description">
                Learning disorders are brain-based processing issues that make
                it difficult to learn and use skills like reading, writing, and
                math.
              </p>
              <Link to="/depression" class="card-link">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataCards;
