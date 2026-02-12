import { Button } from "@/components/ui/button"
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

 

export const LoginPage = ({ className, ...props }: React.ComponentProps<"div">) => {
  
    const navigate = useNavigate();
    const {login} = useAuthStore();



  const [isPosting, setIsPosting] = useState(false)

  const handleLogin = async( event : FormEvent<HTMLFormElement>) => 
    {
      event.preventDefault();
      setIsPosting(true);

      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get('email') as string;
       const password = formData.get('password') as string;

       const isValid = await login(email,password);
    
      if(isValid){
        navigate('/');
        return;
      }
    }
  return (
     <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #78c79e 100%)' }}>
      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl bg-white">
        
        {/* Left Section - Logo & Branding */}
        <div className="hidden md:flex items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, #78c79e 0%, #ffffff 100%)' }}>
          <div className="text-center">
            <img
              src="/logo-banco.png"
              alt="Banco de Alimentos Perú"
              width={300}
              height={300}
              className="w-full max-w-xs mx-auto mb-8"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-white">
          {/* Mobile Logo */}
          <div className="md:hidden mb-8 w-full">
            <img
              src="/logo-banco.png"
              alt="Banco de Alimentos Perú"
              width={200}
              height={100}
              className="mx-auto"
            />
          </div>

          {/* Form Container */}
          <div className="w-full max-w-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Iniciar Sesión
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-transparent text-gray-700 placeholder-gray-400 transition"
                  style={{
                    boxShadow: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #78c79e'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  placeholder="•••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-transparent text-gray-700 placeholder-gray-400 transition"
                  style={{
                    boxShadow: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 2px #78c79e'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full text-white font-semibold py-3 rounded-full transition duration-200"
                style={{ backgroundColor: '#78c79e' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5da87b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#78c79e'}
              >
                Iniciar sesión
              </Button>
            </form>

            {/* Forgot Password Section */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-gray-700 font-medium">¿Olvidaste tu contraseña?</p>
              <p className="text-gray-500 text-sm">
                Comunicate con el Administrador del sistema.
              </p>
            </div>

            {/* Footer Links */}
            <div className="mt-8 flex justify-center gap-4 text-sm">
              <a href="#" className="font-medium transition" style={{ color: '#78c79e' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5da87b'} onMouseLeave={(e) => e.currentTarget.style.color = '#78c79e'}>
                Términos de uso
              </a>
              <span className="text-gray-300">·</span>
              <a href="#" className="font-medium transition" style={{ color: '#78c79e' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5da87b'} onMouseLeave={(e) => e.currentTarget.style.color = '#78c79e'}>
                Política de privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
