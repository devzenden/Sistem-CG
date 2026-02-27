
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useAuthStore } from "@/auth/store/auth.store"
import { useNavigate } from "react-router"

interface LoginFormProps {
  logoUrl?: string
  backgroundImageUrl?: string
}

export function LoginForm({ 
  logoUrl = "/logo.png", // Reemplaza con tu logo
  backgroundImageUrl = "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070" // Imagen de voluntarios - reemplaza con tu imagen
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({})
  const [submitted, setSubmitted] = useState(false)
  const {login} = useAuthStore();
  const navigate = useNavigate();
  
  
  
  const validateForm = () => {
    const newErrors: { email?: boolean; password?: boolean } = {}
    if (!email.trim()) newErrors.email = true
    if (!password.trim()) newErrors.password = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    


    if (!validateForm()) return
    
    setIsLoading(true)
    // Aquí agregas tu lógica de autenticación

     const isValid = await login(email,password);
    
       if(isValid){
       navigate('/central/dashp');
         return;
       }




    console.log("Login con:", { email, password })
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Panel izquierdo - Formulario */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-10">
            <img 
              src={logoUrl} 
              alt="Banco de Alimentos Perú" 
              className="h-16 w-auto object-contain"
              onError={(e) => {
                // Fallback si no hay logo
                e.currentTarget.style.display = 'none'
              }}
            />
            {/* Logo placeholder mientras cargas el real */}
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-emerald-600">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-gray-800">BANCO <span className="text-green-600">DE</span></span>
                <span className="text-lg font-bold text-green-600">ALIMENTOS</span>
                <span className="text-sm font-semibold text-red-500">PERÚ</span>
              </div>
            </div>
          </div>

          {/* Título */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
            <p className="mt-2 text-sm text-gray-500">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (submitted) setErrors((prev) => ({ ...prev, email: !e.target.value.trim() }))
                }}
                className={`h-11 bg-gray-50 placeholder:text-gray-400 ${
                  submitted && errors.email 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : email.trim() 
                      ? "border-[#78c79e] focus:border-[#78c79e] focus:ring-[#78c79e]"
                      : "border-gray-300 focus:border-[#78c79e] focus:ring-[#78c79e]"
                }`}
              />
              {submitted && errors.email && (
                <p className="mt-1 text-sm text-red-500">El correo electrónico es requerido</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (submitted) setErrors((prev) => ({ ...prev, password: !e.target.value.trim() }))
                  }}
                  className={`h-11 bg-gray-50 pr-10 placeholder:text-gray-400 ${
                    submitted && errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                      : password.trim() 
                        ? "border-[#78c79e] focus:border-[#78c79e] focus:ring-[#78c79e]"
                        : "border-gray-300 focus:border-[#78c79e] focus:ring-[#78c79e]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {submitted && errors.password && (
                <p className="mt-1 text-sm text-red-500">La contraseña es requerida</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full shadow-md text-white"
              style={{
                background: "linear-gradient(to right, #78c79e, #a8dbbe)",
              }}
            >
              {isLoading ? "Iniciando..." : "Iniciar sesión"}
            </Button>
          </form>

          {/* Link de recuperación */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿Olvidaste tu contraseña?{" "}
              <a 
                href="#" 
                className="font-medium text-[#78c79e] hover:text-[#6ab78e] hover:underline"
              >
                Comunícate con el Administrador
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Panel derecho - Imagen de fondo */}
      <div 
        className="relative hidden overflow-hidden rounded-tl-[40px] rounded-bl-[40px] lg:block lg:w-1/2"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/30 rounded-tl-[40px] rounded-bl-[40px]" />
        
        {/* Texto sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="bg-gradient-to-t from-black/20 to-transparent p-6">
            <h2 className="text-2xl font-bold leading-tight text-balance drop-shadow-lg lg:text-3xl">
              Alimentando esperanza, construyendo futuro.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90 drop-shadow-md lg:text-base">
              Juntos podemos reducir el desperdicio de alimentos y llevar nutrición a quienes más lo necesitan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
