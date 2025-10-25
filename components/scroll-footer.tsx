import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react"

export function ScrollFooter() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Portfolio
            </p>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>your.email@example.com</span>
            </a>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
