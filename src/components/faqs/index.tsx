import * as Accordion from "@radix-ui/react-accordion";
import "./styles.css";

const faqs = [
  {
    id: "vocal-remover",
    question: "¿Qué es Vocal Remover?",
    answer:
      "Vocal Remover es una plataforma que ofrece servicios de inteligencia artificial para separar las voces e instrumentales de una cancion.",
  },
  {
    id: "vip-remixer",
    question: "¿Qué es Vip Remixer?",
    answer:
      "Vip Remixer es una plataforma que ofrece remixes exclusivos para DJ.",
  },
  {
    id: "creditos",
    question: "¿Cómo puedo usar mis creditos?",
    answer:
      "Los creditos se pueden utilizar para descargar remixes, sonidos y otros servicios dentro de la plataforma que acepte creditos.",
  },
  {
    id: "planes",
    question: "¿Cuál es la diferencia entre los planes?",
    answer:
      "El plan Productor ofrece acceso a Vocal Remover. Con el plan DJ obtienes acceso a remixes y sonidos exclusivos y 100 creditos. El plan DJ/Productor combina ambos servicios y otorga 200 creditos mas una bonificacion de 25 creditos adicionales.",
  },
  {
    id: "pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos pagos con tarjeta de credito, PayPal y otros metodos de pago locales en Peru como Yape, Plin o Transferencia. Puedes elegir tu metodo preferido durante el proceso de suscripcion.",
  },
  {
    id: "recarga",
    question: "¿Puedo recargar creditos adicionales?",
    answer:
      "Por supuesto, para recargar creditos adicionales primero tienes que tener un plan activo.",
  },
  {
    id: "cancelar",
    question: "¿Cómo puedo cancelar mi suscripción?",
    answer:
      "Puedes cancelar tu suscripcion en cualquier momento desde la configuracion de tu cuenta.",
  },
];

export default function Faqs() {
  return (
    <section className="faq-wrap">
      <Accordion.Root type="single" collapsible className="faq-root">
        {faqs.map((item) => (
          <Accordion.Item key={item.id} value={item.id} className="faq-item">
            <Accordion.Header>
              <Accordion.Trigger className="faq-trigger">
                <span className="faq-question">{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg
                    className="faq-icon-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="faq-content">
              <div className="faq-answer">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
