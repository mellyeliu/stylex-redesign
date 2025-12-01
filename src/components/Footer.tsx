import { Github, Twitter, Youtube, ExternalLink } from "lucide-react";
import { ThemeMode } from "../App";

interface FooterProps {
  themeMode: ThemeMode;
}

export function Footer({ themeMode }: FooterProps) {
  const isDark = themeMode === "dark";

  return (
    <footer className={`border-t ${isDark ? "border-neutral-700 bg-neutral-900" : "border-slate-200 bg-white"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className={`mb-4 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Develop</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Learn</a></li>
              <li><a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`mb-4 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Playground</a></li>
              <li><a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`mb-4 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Participate</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors inline-flex items-center gap-1`}>
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Acknowledgements</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`mb-4 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors inline-flex items-center gap-1`}>
                  Privacy
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className={`${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors inline-flex items-center gap-1`}>
                  Terms
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <span className={`${isDark ? "text-neutral-400" : "text-slate-600"}`}>Copyright © 2025 Meta Platforms, Inc.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className={`p-2 ${isDark ? "text-neutral-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className={`p-2 ${isDark ? "text-neutral-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}>
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className={`p-2 ${isDark ? "text-neutral-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}>
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}