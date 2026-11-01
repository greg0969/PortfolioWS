import { useEffect, useState } from 'react';
import './portfolio.css';

const NAME = 'Grégory Thué';
const EMAIL = 'prenom@exemple.fr';

const links = [
  ['accueil', 'Accueil'],
  ['projets', 'Projets'],
  ['competences', 'Compétences'],
  ['contact', 'Contact'],
];

const projects = [
  { title: 'Laboratoire de pentest', year: '2026', href: '#', text: 'Environnement virtualisé avec Kali Linux et des machines vulnérables pour s’entraîner à l’audit.' },
  { title: 'Analyse de logs avec un SIEM', year: '2025', href: '#', text: 'Collecte et corrélation de journaux avec Wazuh et Elastic pour repérer des comportements suspects.' },
  { title: 'CTF et comptes rendus', year: '2025', href: '#', text: 'Compétitions Capture The Flag (web, cryptographie, forensic) et write-ups de chaque défi résolu.' },
];

const skills = [
  { title: 'Réseaux et systèmes', text: 'TCP/IP, Linux, Windows Server, Active Directory, pare-feu.' },
  { title: 'Sécurité offensive et défensive', text: 'Nmap, Burp Suite, Metasploit, OWASP Top 10, SIEM, durcissement.' },
  { title: 'Scripts et outils', text: 'Python, Bash, Git, Docker, rédaction de rapports d’audit.' },
];

export default function Portfolio() {
  const [active, setActive] = useState('accueil');
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a className="logo" href="#accueil" aria-label="Grégory Thué, retour à l’accueil">
        <img src="/logo-cyber.svg" alt="" width="48" height="48" />
      </a>
      <nav className="nav" aria-label="Navigation principale">
        <button type="button" onClick={() => setDark(!dark)} aria-label="Changer de thème">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : undefined}>
            {label}
          </a>
        ))}
      </nav>

      <div className="wrap">
        <main>
          <div className="hero" id="accueil">
            <h1>{NAME}</h1>
            
            <p>Bonjour ! Étudiant en cybersécurité, je me forme à l’audit, à la défense des systèmes et à l’analyse d’incidents.</p>
          </div>

          <section id="projets">
            <h2>Projets</h2>
            {projects.map((p) => (
              <a className="proj" href={p.href} key={p.title}>
                <h3>{p.title}</h3>
                <small>{p.year}</small>
                <p>{p.text}</p>
              </a>
            ))}
          </section>

          <section id="competences">
            <h2>Compétences</h2>
            <div className="skills">
              {skills.map((s) => (
                <div key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact">
            <h2>Me contacter</h2>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p><a href="#">GitHub</a> · <a href="#">LinkedIn</a></p>
          </section>
        </main>

        <footer>© 2026 {NAME}</footer>
      </div>
    </>
  );
}
