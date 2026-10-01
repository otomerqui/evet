import { Link } from 'react-router-dom';
import {
  PawPrint,
  Stethoscope,
  Search,
  BarChart3,
  Palette,
  ShieldCheck,
  MessageCircle,
  Check,
} from 'lucide-react';

const whatsappNumber = '573118035503';
const whatsappMessage = encodeURIComponent(
  'Hola, quiero más información sobre eVet para mi clínica veterinaria.'
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const features = [
  {
    icon: PawPrint,
    title: 'Historial médico por mascota',
    description:
      'Cada paciente tiene su ficha completa: raza, edad, peso y dueño, junto con todas sus consultas registradas en orden.',
  },
  {
    icon: Stethoscope,
    title: 'Consultas y diagnósticos',
    description:
      'Registra motivo de consulta, diagnóstico, tratamiento y notas de cada visita, con la opción de editarlas si necesitas corregir algo.',
  },
  {
    icon: Search,
    title: 'Búsqueda rápida',
    description:
      'Encuentra cualquier paciente por su nombre o el de su dueño en segundos, sin importar cuántos registros tengas.',
  },
  {
    icon: BarChart3,
    title: 'Panel con estadísticas',
    description:
      'Visualiza el total de pacientes y consultas, con tendencias de los últimos días para tener el pulso de tu clínica.',
  },
  {
    icon: Palette,
    title: 'Personalización de tu clínica',
    description:
      'Agrega el logo, nombre, dirección y contacto de tu clínica para que la plataforma se sienta parte de tu negocio.',
  },
  {
    icon: ShieldCheck,
    title: 'Tus datos, protegidos',
    description:
      'Cada clínica accede únicamente a su propia información, con inicio de sesión privado y datos alojados de forma segura.',
  },
];

const included = [
  'Pacientes y consultas ilimitadas',
  'Panel de estadísticas',
  'Logo y datos de tu clínica',
  'Soporte directo por WhatsApp',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-ink-500/10 bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2 text-lg font-semibold text-ink-900">
            <PawPrint className="text-brand-600" size={22} />
            eVet
          </span>
          <Link
            to="/login"
            className="text-sm font-semibold text-ink-500 hover:text-ink-900"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <PawPrint size={28} />
        </div>
        <h1 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
          El historial médico de tus pacientes, siempre a la mano
        </h1>
        <p className="mt-4 text-base text-ink-500">
          eVet es la plataforma para que tu clínica veterinaria organice pacientes,
          consultas e historiales médicos en un solo lugar, sin papeles ni hojas de cálculo.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <MessageCircle size={18} />
          Contáctanos por WhatsApp
        </a>
      </section>
      

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold text-ink-900">
          Todo lo que tu clínica necesita
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-500">
          Y seguimos mejorando: estamos trabajando constantemente en nuevas funciones
          para hacer eVet cada vez más útil para tu día a día.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-semibold text-ink-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl bg-surface p-8 shadow-sm sm:p-10">
          <div className="text-center">
            <span className="inline-block rounded-full bg-alert-500/10 px-3 py-1 text-xs font-semibold text-alert-500">
              50% de descuento para nuestros primeros 10 clientes
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-ink-900">Un solo plan, sin sorpresas</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-canvas p-5 text-center">
              <p className="text-sm text-ink-500">Pago único de activación</p>
              <p className="mt-1 text-2xl font-semibold text-ink-900">$1.000.000 COP</p>
            </div>
            <div className="rounded-xl bg-canvas p-5 text-center">
              <p className="text-sm text-ink-500">Suscripción anual</p>
              <p className="mt-1 text-2xl font-semibold text-ink-900">
                <span className="mr-1.5 text-base text-ink-500 line-through">$2.000.000</span>
                $1.000.000 COP
              </p>
              <p className="mt-0.5 text-xs text-ink-500">primeros 10 clientes · luego $2.000.000/año</p>
            </div>
          </div>

          <ul className="mx-auto mt-8 max-w-sm space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-ink-900">
                <Check size={16} className="shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              <MessageCircle size={18} />
              Quiero mi clínica en eVet
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-500/10 py-8 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} eVet. Todos los derechos reservados.
      </footer>
    </div>
  );
}