import { Github, Twitter, Youtube } from "lucide-react";
import { ThemeMode } from "../App";

interface FooterProps {
  themeMode: ThemeMode;
}

export function Footer({ themeMode }: FooterProps) {
  const isDark = themeMode === "dark";

  return (
    <footer className={`border-t ${isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className={`mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Features</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Pricing</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Documentation</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Guides</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>About</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Careers</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Privacy</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>Terms</a></li>
              <li><a href="#" className={`${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}>License</a></li>
            </ul>
          </div>
        </div>
        
        <div className={`pt-8 border-t ${isDark ? "border-slate-800" : "border-slate-200"} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <span className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>© 2025 StyleX. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className={`p-2 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className={`p-2 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}>
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className={`p-2 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-900"} transition-colors`}>
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}