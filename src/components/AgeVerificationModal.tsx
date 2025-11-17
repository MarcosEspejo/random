import { useState } from 'react';
import { FiShield, FiCheckCircle, FiX } from 'react-icons/fi';

interface AgeVerificationModalProps {
  onVerified: () => void;
  onUnder18: () => void;
}

const AgeVerificationModal = ({ onVerified, onUnder18 }: AgeVerificationModalProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleOver18 = () => {
    if (!acceptedTerms) {
      alert('Debes aceptar los términos y condiciones para continuar');
      return;
    }
    onVerified();
  };

  const handleUnder18 = () => {
    onUnder18();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-dark-200/95 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 max-w-lg w-full border border-gray-700/50 relative shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Icono */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-cyan-500/10 flex items-center justify-center border-2 border-cyan-500/30">
              <FiShield className="text-cyan-400 text-3xl sm:text-4xl" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
            Verificación de Edad
          </h2>

          {/* Descripción */}
          <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            Para acceder a esta plataforma, debes confirmar que eres mayor de 18 años.
          </p>

          {/* Checkbox de términos */}
          <div className="bg-dark-100/40 rounded-lg sm:rounded-xl p-3 sm:p-5 mb-6 sm:mb-8 border border-gray-700/50">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-gray-600 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 bg-dark-300 cursor-pointer"
              />
              <span className="text-sm text-gray-300 leading-relaxed">
                Confirmo que he leído y acepto los{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors"
                >
                  términos y condiciones de uso
                </button>
              </span>
            </label>
          </div>

          {/* Pregunta */}
          <p className="text-white text-center font-medium mb-4 sm:mb-6 text-base sm:text-lg">
            ¿Eres mayor de 18 años?
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <button
              onClick={handleOver18}
              disabled={!acceptedTerms}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                acceptedTerms
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiCheckCircle className="text-xl" />
              Sí, soy mayor de 18 años
            </button>
            <button
              onClick={handleUnder18}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200 text-sm sm:text-base"
            >
              No, soy menor de 18 años
            </button>
          </div>

          {/* Nota de privacidad */}
          <p className="text-xs text-gray-500 text-center mt-4 sm:mt-6 leading-relaxed">
            Tu privacidad es importante. Esta verificación se almacena localmente y no compartimos información personal.
          </p>
        </div>
      </div>

      {/* Modal de términos y condiciones */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-3 sm:p-4">
          <div className="bg-dark-200 rounded-xl sm:rounded-2xl p-5 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Términos y Condiciones de Uso</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">1. Aceptación de Términos</h3>
                <p className="text-gray-400">Al acceder y utilizar esta plataforma, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguno de estos términos, no debe utilizar este servicio.</p>
              </section>

              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">2. Requisitos de Edad</h3>
                <p className="text-gray-400">Este servicio está destinado exclusivamente para usuarios mayores de 18 años. Al confirmar su edad, usted declara y garantiza que tiene al menos 18 años de edad y que posee la capacidad legal para aceptar estos términos.</p>
              </section>

              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">3. Naturaleza del Servicio</h3>
                <p className="text-gray-400">Esta plataforma ofrece un servicio de chat anónimo y aleatorio. Las conversaciones son efímeras y no se almacenan en nuestros servidores. Los usuarios deben comportarse de manera respetuosa y responsable en todo momento.</p>
              </section>

              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">4. Contenido Prohibido</h3>
                <p className="text-gray-400 mb-2">Queda estrictamente prohibido compartir:</p>
                <ul className="list-none ml-4 space-y-2 text-gray-400">
                  <li>• Enlaces externos o URLs (serán bloqueados automáticamente)</li>
                  <li>• Contenido ilegal, abusivo, difamatorio u ofensivo</li>
                  <li>• Material que promueva violencia, discriminación o actividades ilegales</li>
                  <li>• Información personal propia o de terceros</li>
                  <li>• Contenido comercial, publicitario o spam</li>
                </ul>
              </section>

              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">5. Privacidad y Protección de Datos</h3>
                <p className="text-gray-400">No recopilamos, almacenamos ni procesamos mensajes o información personal de los usuarios. Las conversaciones son temporales y se eliminan automáticamente al finalizar cada sesión. La verificación de edad se almacena únicamente en su dispositivo local.</p>
              </section>

              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">6. Moderación y Filtrado</h3>
                <p className="text-gray-400">Implementamos sistemas automáticos de filtrado de contenido para detectar y censurar lenguaje inapropiado y bloquear enlaces. Estas medidas son necesarias para mantener un entorno seguro para todos los usuarios.</p>
              </section>

              <section className="pb-4 border-b border-gray-700/50">
                <h3 className="text-base font-semibold text-white mb-3">7. Limitación de Responsabilidad</h3>
                <p className="text-gray-400">El servicio se proporciona "tal cual" sin garantías de ningún tipo. No somos responsables del contenido de las conversaciones entre usuarios ni de cualquier daño derivado del uso de la plataforma. Cada usuario es responsable de sus propias interacciones.</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-white mb-3">8. Modificaciones</h3>
                <p className="text-gray-400">Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso. El uso continuado del servicio después de dichas modificaciones constituye su aceptación de los nuevos términos.</p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <button
                onClick={() => setShowTerms(false)}
                className="w-full py-3.5 px-6 rounded-xl font-medium bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-200 shadow-lg"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgeVerificationModal;
