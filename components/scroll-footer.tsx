import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react"

export function ScrollFooter() {
  return (
    <footer className="bg-black text-white py-12 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left side - Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Portfolio Gallery
            </p>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-500 transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-500 transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
              <span>your.email@example.com</span>
            </a>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 hover:scale-110 transform"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 hover:scale-110 transform"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-yellow-500/20 text-center">
          <p className="text-sm text-gray-400">
            Crafting exceptional digital experiences with modern web technologies
          </p>
        </div>
      </div>
    </footer>
  )
}
