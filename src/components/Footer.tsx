import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            Nova<span className="text-slate-400">Tech</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Building digital products, empowering people, and creating
            technology that makes a meaningful difference.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Company</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <Link to="/projects" className="hover:text-white">
              Projects
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Careers</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/careers" className="hover:text-white">
              Open Positions
            </Link>
            <Link to="/login" className="hover:text-white">
              Employee Portal
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>

          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <p>Kochi, Kerala, India</p>
            <p>hello@novatech.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-slate-500">
          © 2026 NovaTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}