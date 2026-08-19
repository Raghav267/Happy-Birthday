import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* =========================
   CUSTOMIZE THESE 4 VALUES
   ========================= */
const GIRLFRIEND_NAME = "My Mishu";
const YOUR_NAME = "Phul Kumari";
const ANNIVERSARY_DATE = "19 September 2025";
const INSTAGRAM_REEL_URL = "https://www.instagram.com/reel/YOUR_REEL_ID/";

/*
  Put your song at:
  public/music.mp3

  Put your photos at:
  public/images/photo1.jpg
  public/images/photo2.jpg
  public/images/photo3.jpg
  public/images/photo4.jpg
*/

function FloatingHearts() {
  const items = ["♡", "♥", "✦", "♡", "♥", "✧", "♡", "♥", "✦"];
  return (
    <div className='floating-hearts' aria-hidden='true'>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ y: "105vh", opacity: 0 }}
          animate={{
            y: "-15vh",
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 8 + i * 0.7,
            repeat: Infinity,
            delay: i * 1.1,
            ease: "easeInOut",
          }}
          style={{ left: `${3 + i * 11}%` }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

function Bear({ mood = "happy", small = false }) {
  return (
    <motion.div
      className={`bear-scene ${mood} ${small ? "small-bear" : ""}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className='bear bubu'>
        <div className='ear left' />
        <div className='ear right' />
        <div className='face'>
          <span className='eye left-eye'>•</span>
          <span className='eye right-eye'>•</span>
          <span className='nose'>•</span>
          <span className='blush left-blush' />
          <span className='blush right-blush' />
          <span className='mouth'>⌣</span>
        </div>
        <div className='body'>
          <span className='heart-badge'>♥</span>
        </div>
      </div>
      <div className='bear dudu'>
        <div className='ear left' />
        <div className='ear right' />
        <div className='face'>
          <span className='eye left-eye'>•</span>
          <span className='eye right-eye'>•</span>
          <span className='nose'>•</span>
          <span className='blush left-blush' />
          <span className='blush right-blush' />
          <span className='mouth'>⌣</span>
        </div>
        <div className='body'>
          <span className='heart-badge'>♥</span>
        </div>
      </div>
    </motion.div>
  );
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hasSong, setHasSong] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onError = () => setHasSong(false);
    audio.addEventListener("error", onError);

    // Start the song 5 seconds after opening the website
    const timer = setTimeout(async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Autoplay blocked by browser. User interaction required.");
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !hasSong) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch (error) {
      console.log("Could not play music:", error);
    }
  };

  return (
    <>
      <audio ref={audioRef} src='/music.mp3' loop preload='auto' />

      <button
        className={`music-button ${playing ? "playing" : ""}`}
        onClick={toggleMusic}
      >
        {playing ? "⏸️ Birthday Song" : "🎵 Birthday Song"}
      </button>
    </>
  );
}

function Progress() {
  const location = useLocation();
  const steps = [
    { path: "/sorry", label: "Sorry", icon: "💌" },
    { path: "/birthday", label: "Birthday", icon: "🎂" },
    { path: "/memories", label: "Memories", icon: "📸" },
    { path: "/surprise", label: "Reel", icon: "🎥" },
  ];

  return (
    <div className='progress'>
      {steps.map((step, index) => (
        <Link
          key={step.path}
          to={step.path}
          className={location.pathname === step.path ? "active" : ""}
        >
          <span>{step.icon}</span>
          <small>{index + 1}</small>
          <em>{step.label}</em>
        </Link>
      ))}
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className='app-shell'>
      <FloatingHearts />
      <header className='topbar'>
        <Link to='/' className='logo'>
          🐻 Bubu <b>×</b> Dudu 🐼
        </Link>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/sorry'>Story</Link>
          <Link to='/memories'>Memories</Link>
          <Link to='/surprise'>Surprise</Link>
        </nav>
        <MusicPlayer />
      </header>

      <main className='page-container'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={useLocation().pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer>Made with too much love by {YOUR_NAME} ❤️</footer>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <section className='hero'>
      <div className='hero-copy'>
        <div className='tiny-pill'>
          A tiny birthday world made just for you ✨
        </div>
        <h1>
          Hey, <span>Bubu</span>...
        </h1>
        <p className='hero-question'>
          Someone has been wanting to tell you something.
        </p>
        <p className='hero-subtitle'>
          And yes... that someone is your very annoying {YOUR_NAME}. 🥺
        </p>

        <div className='hero-actions'>
          <button className='primary-btn' onClick={() => navigate("/sorry")}>
            Start our little story 💌
          </button>
        </div>

        <div className='date-card'>
          <span>📅</span>
          <div>
            <small>Our little story began</small>
            <strong>{ANNIVERSARY_DATE}</strong>
          </div>
        </div>
      </div>

      <div className='hero-art'>
        <div className='cloud cloud-one' />
        <div className='cloud cloud-two' />
        <Bear />
        <div className='sparkle sparkle-one'>✦</div>
        <div className='sparkle sparkle-two'>✧</div>
        <div className='love-note'>For my favourite human 💗</div>
      </div>
    </section>
  );
}

function Sorry() {
  const navigate = useNavigate();
  const [forgiven, setForgiven] = useState(false);

  return (
    <section className='content-page'>
      <Progress />
      <div className='section-heading'>
        <div className='tiny-pill'>Chapter 01 · Dudu&apos;s confession</div>
        <h2>Okay... first, I&apos;m sorry. 🥺</h2>
        <p>I have a tiny letter for my Bubu.</p>
      </div>

      <div className='two-column'>
        <div className='illustration-card'>
          <Bear mood='sad' />
          <div className='speech-bubble'>
            {forgiven
              ? "Bubu forgave Dudu! 🥹❤️"
              : "Bubuuu... I&apos;m sorry 👉👈"}
          </div>
        </div>

        <article className='letter-card'>
          <div className='envelope-top'>💌</div>
          <h3>Dear Bubu,</h3>
          <p>
            I know I haven&apos;t always been the perfect Dudu. Sometimes I
            annoy you, sometimes I say stupid things, and sometimes I make you
            angry when all I really want is to see you smile.
          </p>
          <p>
            So before I say anything else...
            <br />
            <strong>I&apos;m sorry. 🥺👉👈</strong>
          </p>
          <p>
            I may not always get everything right, but one thing I know for sure
            is that I never want to lose my Bubu.
          </p>
          <p className='signature'>
            Yours forever annoying,
            <br />
            <strong>{YOUR_NAME} 🐻❤️</strong>
          </p>

          {!forgiven ? (
            <button
              className='primary-btn full'
              onClick={() => setForgiven(true)}
            >
              Forgive Dudu? 🥺
            </button>
          ) : (
            <button
              className='primary-btn full'
              onClick={() => navigate("/birthday")}
            >
              Okay... birthday time 🎂 →
            </button>
          )}
        </article>
      </div>
    </section>
  );
}

function Birthday() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <section className='content-page'>
      <Progress />
      <div className='section-heading'>
        <div className='tiny-pill'>Chapter 02 · The important part</div>
        <h2>Happy Birthday, {GIRLFRIEND_NAME}! 🎂</h2>
        <p>Today is your day. So {YOUR_NAME} has prepared something special.</p>
      </div>

      {!opened ? (
        <motion.div
          className='birthday-envelope'
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className='envelope-icon'>💌</div>
          <h3>A letter from Dudu</h3>
          <p>It&apos;s a little cheesy. You have been warned. 👉👈</p>
          <button className='primary-btn' onClick={() => setOpened(true)}>
            Open the letter 💗
          </button>
        </motion.div>
      ) : (
        <motion.article
          className='birthday-letter'
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className='birthday-top'>🎈 🎂 🎀</div>
          <h3>Happy Birthday, My Bubu ❤️</h3>

          <p>
            Today isn&apos;t just another day. Today is the day my favourite
            person was born.
          </p>
          <p>
            I hope this new year of your life brings you everything you&apos;ve
            ever wished for — more smiles, more adventures, more beautiful
            memories, and lots and lots of reasons to be happy.
          </p>
          <p>
            Thank you for being you. Thank you for all the little moments, the
            silly conversations, the laughs, the fights, the making-up, and
            every tiny memory that somehow became one of my favourite things.
          </p>
          <p>
            If I could make one birthday wish for you, it would be simple:
            <strong> I want to see you happy. Always.</strong>
          </p>
          <p>
            And selfishly... I want to be there for as many of those happy
            moments as possible.
          </p>

          <div className='big-love'>
            Bubu + Dudu
            <br />
            <span>forever & ever 💗</span>
          </div>

          <p className='signature'>
            Happy Birthday, my favourite person.
            <br />
            I love youuuuu. 🥺❤️
            <br />
            <strong>— {YOUR_NAME} 🐻</strong>
          </p>

          <button className='primary-btn' onClick={() => navigate("/memories")}>
            See our little memories 📸 →
          </button>
        </motion.article>
      )}
    </section>
  );
}

const memories = [
  {
    src: "/images/photo1.jpeg",
    fallback: "📸",
    title: "Our first little memory",
  },
  { src: "/images/photo2.jpeg", fallback: "🥰", title: "That smile I love" },
  { src: "/images/photo3.jpeg", fallback: "😂", title: "Us being idiots" },
  { src: "/images/photo4.jpeg", fallback: "❤️", title: "My favourite moment" },
];

function MemoryImage({ memory }) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div className='memory-placeholder'>
      <span>{memory.fallback}</span>
      <small>Add your photo here</small>
    </div>
  ) : (
    <img src={memory.src} alt={memory.title} onError={() => setFailed(true)} />
  );
}

function Memories() {
  const navigate = useNavigate();

  return (
    <section className='content-page'>
      <Progress />
      <div className='section-heading'>
        <div className='tiny-pill'>Chapter 03 · Us ❤️</div>
        <h2>A few of my favourite memories.</h2>
        <p>
          These are placeholders right now. Replace them with your real pictures
          inside <code>public/images</code>.
        </p>
      </div>

      <div className='memory-grid'>
        {memories.map((memory, index) => (
          <motion.div
            className='memory-card'
            key={memory.src}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6, rotate: index % 2 ? 1 : -1 }}
          >
            <MemoryImage memory={memory} />
            <div className='memory-caption'>
              <span>💗</span>
              <strong>{memory.title}</strong>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='timeline-card'>
        <div>
          <span className='timeline-icon'>🌷</span>
          <small>Our story</small>
          <strong>{ANNIVERSARY_DATE}</strong>
        </div>
        <div className='timeline-line' />
        <div>
          <span className='timeline-icon'>🎂</span>
          <small>Today</small>
          <strong>Still choosing you ❤️</strong>
        </div>
      </div>

      <div className='center-button'>
        <button className='primary-btn' onClick={() => navigate("/surprise")}>
          Now for the final surprise 🎥 →
        </button>
      </div>
    </section>
  );
}

function Surprise() {
  return (
    <section className='content-page'>
      <Progress />
      <div className='section-heading'>
        <div className='tiny-pill'>Chapter 04 · The final surprise</div>
        <h2>{YOUR_NAME} made something for Bubu... 👀</h2>
        <p>This one is waiting for you on Instagram.</p>
      </div>

      <div className='reel-card'>
        <div className='phone'>
          <div className='phone-speaker' />
          <div className='phone-screen'>
            <div className='reel-gradient'>
              <span className='phone-bears'>🐻 💗 🐼</span>
              <h3>Your birthday reel</h3>
              <p>Warning: excessive cuteness ahead.</p>
              <a
                className='instagram-btn'
                href={INSTAGRAM_REEL_URL}
                target='_blank'
                rel='noreferrer'
              >
                Watch your Reel ✨
              </a>
            </div>
          </div>
        </div>

        <div className='reel-copy'>
          <span className='reel-eyebrow'>🎥 Made specially for you</span>
          <h3>One last little surprise...</h3>
          <p>This reel contains:</p>
          <ul>
            <li>🐻 One extremely annoying {YOUR_NAME}</li>
            <li>🐼 One very special Bubu</li>
            <li>💗 A suspicious amount of love</li>
            <li>🎂 Birthday-level cuteness</li>
          </ul>

          <a
            className='primary-btn inline-btn'
            href={INSTAGRAM_REEL_URL}
            target='_blank'
            rel='noreferrer'
          >
            Open Instagram Reel →
          </a>

          <p className='small-note'>
            Replace <code>INSTAGRAM_REEL_URL</code> in <code>src/App.jsx</code>{" "}
            with your real Reel URL.
          </p>
        </div>
      </div>

      <div className='final-message'>
        <span>🐻</span>
        <div>
          <strong>Happy Birthday, Bubu! ❤️</strong>
          <p>
            Love, your {YOUR_NAME} — today, tomorrow, and all the annoying days
            in between.
          </p>
        </div>
        <span>🐼</span>
      </div>
    </section>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sorry' element={<Sorry />} />
        <Route path='/birthday' element={<Birthday />} />
        <Route path='/memories' element={<Memories />} />
        <Route path='/surprise' element={<Surprise />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
