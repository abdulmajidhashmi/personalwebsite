import HomePage from "./Components/Homepage/HomePage";
import "./App.css";
import Video from "./Components/VideoCall/Video";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Chat from "./Components/Chat/Chat";
import Disease from "./Components/Disease/Disease";
import DiseaseExpand from "./Components/DiseaseExpand/DiseaseExpand";
import QuickActions from "./Components/QuickActions/QuickActions";
import Appointments from "./Components/Appointments/Appointments";
import AppointmentsAdmin from "./Components/Admin/Appointments/AppointmentsAdmin";
import HomepageAdmin from "./Components/Admin/Homepage/HomepageAdmin";
import ChatAdminUserDetails from "./Components/Admin/Chat/ChatAdminUserDetails";
import ChatAdmin from "./Components/Admin/Chat/ChatAdmin";

const diseaseData = [
  {
    index: 1,
    title: "Depression",
    shortDiscription:
      "Major depressive disorder affects how you feel, think and behaveand can lead to various emotional and physical problems.",
    image:
      "https://static.vecteezy.com/system/resources/previews/011/411/660/non_2x/man-felling-depression-under-moral-stressful-sad-feel-guilty-need-attention-help-sitting-alone-vector.jpg",
    discription: "",
  },
  {
    index: 2,
    title: "Bipolar Disorder",
    shortDiscription:
      "Bipolar disorders are mental health conditions characterized by periodic, intense emotional states affecting a person's mood,energy, and ability to function.",
    image:
      "https://static.vecteezy.com/system/resources/previews/025/677/823/non_2x/woman-with-bipolar-disorder-symptom-in-flat-design-bipolar-patient-with-mood-swings-sometimes-in-a-good-mood-sometimes-sad-vector.jpg",
    discription: "",
  },
  {
    index: 3,
    title: "Attention Deficit Hyperactivity Disorder",
    shortDiscription:
      "Attention-deficit/hyperactivity disorder (ADHD) is a chronic brain-based disorder that affects a person's ability to focus, be still, and control their impulses.",
    image:
      "https://static.vecteezy.com/system/resources/previews/007/820/657/non_2x/woman-with-panic-attack-anxiety-disorder-symptoms-vector.jpg",
    discription: "",
  },
  {
    index: 4,
    title: "Anxiety disorder",
    shortDiscription:
      "Anxiety disorders are mental health conditions that involve excessive and persistent feelings of fear, worry, and dread.",
    image:
      "https://static.vecteezy.com/system/resources/previews/011/415/865/non_2x/social-anxiety-disorder-concept-icon-mental-issues-downside-of-social-media-abstract-idea-thin-line-illustration-isolated-outline-drawing-editable-stroke-vector.jpg",
    discription: "",
  },
  {
    index: 5,
    title: "Obsessive compulsive disorder",
    shortDiscription:
      "OCD is a long-term anxiety disorder that causes people to have unwanted, recurring thoughts (obsessions) and repetitive behaviors (compulsions).",
    image:
      "https://static.vecteezy.com/system/resources/previews/008/552/155/non_2x/little-girl-with-obsessive-compulsive-disorder-children-s-mental-health-illustration-in-flat-style-vector.jpg",
    discription: "",
  },
  {
    index: 6,
    title: "Post-Traumatic Stress Disorder",
    shortDiscription:
      "Post-traumatic stress disorder (PTSD) is a mental health condition that can develop after someone experiences or witnesses a traumatic event.",
    image:
      "https://static.vecteezy.com/system/resources/previews/006/031/631/non_2x/post-traumatic-stress-disorder-shocked-scared-shock-panic-surprise-face-angry-and-frustrated-fear-and-upset-for-mistake-concept-illustration-free-vector.jpg",
    discription: "",
  },
  {
    index: 7,
    title: "Phobias",
    shortDiscription:
      "A phobia is an intense, irrational, and uncontrollable fear of a specific object, situation, or activity.",
    image:
      "https://static.vecteezy.com/system/resources/previews/030/724/196/non_2x/man-suffers-from-phobias-and-fears-the-psychological-concept-of-mental-disorder-and-paranoia-illustration-vector.jpg",
    discription: "",
  },
  {
    index: 8,
    title: "Mood disorder",
    shortDiscription:
      "A mood disorder is a mental illness that affects a person's emotional state, causing them to experience long periods of sadness, depression, mania, or elation.",
    image:
      "https://static.vecteezy.com/system/resources/previews/003/685/710/non_2x/mood-disorder-color-icon-manic-and-depressive-episodes-dysthymia-cyclothymia-emotional-swing-happy-and-sad-psychological-problem-psychiatric-issue-mental-health-isolated-illustration-vector.jpg",
    discription: "",
  },
  {
    index: 9,
    title: "Autism Spectrum Disorder",
    shortDiscription:
      "Major depressive disorder affects how you feel, think and behave and can lead to various emotional and physical problems.",
    image:
      "https://static.vecteezy.com/system/resources/previews/050/526/249/non_2x/asperger-syndrome-concept-illustration-design-vector.jpg",
    discription: "",
  },
  {
    index: 10,
    title: "Learning disorder",
    shortDiscription:
      "Learning disorders are brain-based processing issues that make it difficult to learn and use skills like reading, writing, and math.",
    image:
      "https://static.vecteezy.com/system/resources/previews/007/718/681/non_2x/dyslexia-failing-to-read-learning-disability-concept-young-girl-difficulty-in-reading-logopedy-scattered-letters-above-her-head-and-book-illustration-vector.jpg",
    discription: "",
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <QuickActions />
                <Disease />
               
              </>
            }
          />
          <Route
            path="/videoCall"
            element={
              <>
                <Video />
              </>
            }
          />
          <Route
            path="book-appoinment"
            element={
              <>
                <Appointments />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                <Chat />
              </>
            }
          />

          {diseaseData.map((value, index) => (
            <Route
              key={index}
              path={`/${value.title.replace(/\s+/g, "")}`}
              element={
                <>
                  <DiseaseExpand data={value} />
                </>
              }
            />
          ))}

          {/* admim Routes*/}

          <Route
            path="/admin"
            element={
              <>
                <HomepageAdmin />
                <AppointmentsAdmin />
              </>
            }
          />
          <Route
            path="/admin/chat-details"
            element={
              <>
                <ChatAdminUserDetails />
              </>
            }
          />
          <Route
            path="/admin/chat/:id"
            element={
              <>
                <ChatAdmin />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
