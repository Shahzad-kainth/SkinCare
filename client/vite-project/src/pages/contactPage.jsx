import { Mail, Phone, Linkedin, Github } from "lucide-react";
export default function ContactPage(){
    return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 tracking-tight mb-8">Contact Me</h1>
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Mail className="w-4 h-4 text-teal-500" />
          Email: <a href="mailto:yourname@example.com" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors duration-200">yourname@example.com</a>
        </p>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 text-teal-500" />
          Phone: <a href="tel:+1234567890" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors duration-200">+1 234 567 890</a>
        </p>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Linkedin className="w-4 h-4 text-teal-500" />
          LinkedIn: <a href="https://linkedin.com/in/yourprofile" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors duration-200" target="_blank">linkedin.com/in/yourprofile</a>
        </p>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Github className="w-4 h-4 text-teal-500" />
          GitHub: <a href="https://github.com/yourusername" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors duration-200" target="_blank">github.com/yourusername</a>
        </p>
      </div>
    </div>
  );
}