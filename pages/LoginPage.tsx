
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, DEMO_USERS } from '../constants';
import Logo from '../components/shared/Logo';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';
import Avatar from '../components/shared/Avatar';
import GlassmorphicContainer from '../components/shared/GlassmorphicContainer';
import FloatingButtonsContainer from '../components/shared/FloatingButtonsContainer';

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Ups, ¿te olvidaste del correo?" })
    .email({ message: "Ingrese un correo corporativo válido" }),
  password: z.string().min(1, { message: "¿Sin contraseña? ¡No puedes pasar! 😉" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [passwordHasValue, setPasswordHasValue] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', 
  });

  const passwordValue = watch('password');
  useEffect(() => {
    setPasswordHasValue(!!passwordValue);
  }, [passwordValue]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    const success = await login(data.email, data.password);
    if (success) {
      // AuthContext's login and App.tsx now handle navigation based on firstLogin flag
    } else {
      setApiError("Credenciales incorrectas. ¿Olvidaste tu contraseña? Prueba con una de las cuentas demo 😜");
    }
    setIsLoading(false);
  };

  const handleDemoUserLogin = async (email: string, pass: string) => {
    setValue('email', email, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setValue('password', pass, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setTimeout(() => {
        handleSubmit(onSubmit)();
    }, 0);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-DEFAULT/5 via-neutral-bgLight to-secondary-DEFAULT/5 dark:from-primary-dark/10 dark:via-neutral-bgDark dark:to-secondary-dark/10 p-4 selection:bg-primary-DEFAULT/30">
      <FloatingButtonsContainer />
      <div className="container mx-auto max-w-5xl lg:max-w-6xl">
        <GlassmorphicContainer className="overflow-hidden md:grid md:grid-cols-12 shadow-2xl" intensity="medium">
          
          <GlassmorphicContainer className="md:col-span-5 p-8 md:p-10 lg:p-12 bg-gradient-to-br from-primary-DEFAULT/20 to-transparent dark:from-primary-dark/25 dark:to-transparent text-neutral-textDark dark:text-neutral-textLight flex flex-col items-center justify-center" intensity="low" borderVisible={false}>
            <div className="w-full">
              <div className="flex justify-center mb-8">
                <Logo className="h-20 md:h-24 lg:h-28" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-neutral-textDark dark:text-neutral-textLight">{APP_NAME}</h1>
              <p className="text-xl lg:text-2xl mb-8 text-center font-light tracking-wide">Conecta a las personas de Inditex con la ayuda de la IA.</p>
              
              <ul className="space-y-3 mb-8 text-sm max-w-md mx-auto flex flex-col items-start">
                <li className="flex items-center"><Icon name="users" className="text-base mr-2 text-primary-DEFAULT"/>Colaboración interna potenciada</li>
                <li className="flex items-center"><Icon name="trophy" className="text-base mr-2 text-primary-DEFAULT"/>Retos gamificados y divertidos</li>
                <li className="flex items-center"><Icon name="robot" className="text-base mr-2 text-primary-DEFAULT"/>Asistente IA amigable y personalizado</li>
                <li className="flex items-center"><Icon name="face-smile" className="text-base mr-2 text-primary-DEFAULT"/>Humor corporativo y memes IA</li>
              </ul>
              
              <div className="flex justify-center mt-8">
                <img 
                  src="/images/team-with-robot.jpg" 
                  alt="Equipo de trabajo colaborando con IA" 
                  className="rounded-lg shadow-lg max-w-full h-auto max-h-72 object-cover"
                />
              </div>
            </div>
          </GlassmorphicContainer>

          <GlassmorphicContainer className="md:col-span-7 p-8 md:p-10 lg:p-12 flex flex-col justify-center" intensity="high" borderVisible={false}>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center text-neutral-textDark dark:text-neutral-textLight">Iniciar Sesión</h2>
            
            {apiError && (
              <div role="alert" className="mb-4 text-sm text-error dark:text-red-300 bg-error/20 dark:bg-red-900/30 backdrop-blur-sm p-3 rounded-md text-center border border-red-300/40 dark:border-error/40 shadow-glass-sm">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                <div className="relative group">
                  <span className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-DEFAULT transition-colors`}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2.006l7.997 3.878A2 2 0 0019.5 7.553V14a2 2 0 01-2 2H2.5a2 2 0 01-2-2V7.553a2 2 0 001.503-1.669z" /><path d="M18 8.118l-8 4-8-4V14a1 1 0 001 1h14a1 1 0 001-1V8.118z" /></svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="nombre.apellido@inditex.com"
                    className={`pl-10 block w-full px-3 py-2.5 border ${errors.email ? 'border-error focus:ring-error focus:border-error' : 'border-white/20 dark:border-white/10 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT'} rounded-md shadow-sm sm:text-sm bg-white/10 dark:bg-neutral-bgDark/30 backdrop-blur-sm text-neutral-textDark dark:text-neutral-textLight transition-colors duration-150 ease-in-out hover:border-primary-DEFAULT/50 dark:hover:border-primary-dark/50 focus:bg-white/20 dark:focus:bg-neutral-bgDark/40`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-error dark:text-red-400">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
                 <div className="relative group">
                   <span className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-DEFAULT transition-colors ${passwordHasValue ? 'text-primary-DEFAULT' : ''}`}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
                   </span>
                  <input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="••••••••••"
                    className={`pl-10 block w-full px-3 py-2.5 border ${errors.password ? 'border-error focus:ring-error focus:border-error' : 'border-white/20 dark:border-white/10 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT'} rounded-md shadow-sm sm:text-sm bg-white/10 dark:bg-neutral-bgDark/30 backdrop-blur-sm text-neutral-textDark dark:text-neutral-textLight transition-colors duration-150 ease-in-out hover:border-primary-DEFAULT/50 dark:hover:border-primary-dark/50 focus:bg-white/20 dark:focus:bg-neutral-bgDark/40`}
                  />
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-error dark:text-red-400">{errors.password.message}</p>}
              </div>
              
              <Button type="submit" isLoading={isLoading} disabled={!isValid || isLoading} className="w-full text-base py-3 mt-2" glassmorphic={true}>
                {passwordHasValue && !isLoading && <span className="mr-2">🔑</span>}
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-300 dark:border-white/10">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 text-center">Acceso Rápido</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">¿Solo quieres probar? Elige una cuenta demo:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DEMO_USERS.slice(0,3).map(user => ( 
                  <button
                    key={user.id} 
                    onClick={() => handleDemoUserLogin(user.email, user.password || '')}
                    disabled={isLoading}
                    className="flex flex-col items-center p-3 border border-black/10 dark:border-white/10 rounded-lg bg-white/10 dark:bg-neutral-bgDark/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-neutral-bgDark/30 hover:shadow-glass transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Avatar src={user.avatar} alt={user.name} size="md" className="mb-2 group-hover:ring-2 group-hover:ring-primary-DEFAULT/50 transition-all"/>
                    <span className="text-sm font-medium text-neutral-textDark dark:text-neutral-textLight">{user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.role === 'Employee' ? 'Emplead@' : user.role}</span>
                    <span className="mt-1.5 text-xs bg-primary-DEFAULT/10 text-primary-dark dark:text-primary-light px-2 py-0.5 rounded-full group-hover:bg-primary-DEFAULT group-hover:text-white transition-colors">Usar esta cuenta</span>
                  </button>
                ))}
              </div>
            </div>
          </GlassmorphicContainer>
        </GlassmorphicContainer>
      </div>
    </div>
  );
};

export default LoginPage;