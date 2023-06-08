import './Contact.css';

function Contact() {
    return (
        <div className="me_contactPage">
            <div className="contactPage">
                <div className="contactPage_container">
                    <p className="contactPage_title">Contacto</p>
                    <section className="contactPage_general">
                        <p className="contactPage_contacts">Contactos de empresa</p>
                        <div className="contact_link">
                            <p>Telefono:&nbsp;</p>
                            <a href="#">5561171850</a>
                        </div>
                        <div className="contact_link">
                            <p>Correo Electronico:&nbsp;</p>
                            <a href="">notlui69@gmail.com</a>
                        </div>
                    </section>
                    {/* <section>
                        <div>
                            <h2>Formulario de Contacto</h2>
                        </div>
                        <div>
                            <form action="#">
                                <p>
                                    <label for="nombre">Nombre:</label>
                                    <input type="text" id="nombre" name="nombre" required />
                                </p>
                                <p>
                                    <label for="correo">Correo electrónico:</label>
                                    <input type="email" id="correo" name="correo" required />
                                </p>
                                <p>
                                    <label for="mensaje">Mensaje:</label>
                                    <textarea id="mensaje" name="mensaje" required></textarea>
                                </p>
                                <p>
                                    <button type="submit">Enviar</button>
                                </p>
                            </form>
                        </div>
                    </section> */}
                    <section>
                        <div>
                            <h2>Preguntas Frecuentes</h2>
                        </div>
                        <div>
                            <p>
                                <h4>¿Qué es la salud mental y por qué es importante cuidarla?</h4>
                                <text>
                                    La salud mental se refiere a nuestro bienestar emocional,
                                    psicológico y social. Incluye nuestra capacidad para manejar el
                                    estrés, las emociones, las relaciones y afrontar los desafíos de
                                    la vida. La salud mental es vital para el funcionamiento diario,
                                    el rendimiento óptimo y el disfrute de la vida.
                                    <br />
                                    Es importante cuidar la salud mental por varias razones:
                                    <br />
                                    -Bienestar emocional: Una buena salud mental nos permite
                                    experimentar emociones positivas, como la alegría y la
                                    satisfacción, y manejar adecuadamente las emociones negativas,
                                    como el estrés y la tristeza.
                                    <br />
                                    -Funcionamiento óptimo: Cuando estamos mentalmente saludables,
                                    podemos concentrarnos, tomar decisiones claras, resolver problemas
                                    y mantener relaciones saludables. La salud mental adecuada mejora
                                    nuestro rendimiento en el trabajo, los estudios y otras áreas de
                                    la vida.
                                    <br />
                                    -Relaciones satisfactorias: Una buena salud mental nos permite
                                    establecer y mantener relaciones saludables. Nos ayuda a
                                    comunicarnos de manera efectiva, establecer límites saludables y
                                    manejar conflictos de manera constructiva.
                                    <br />
                                    -Resiliencia: La salud mental fortalece nuestra capacidad de
                                    recuperación frente a los desafíos y adversidades de la vida. Nos
                                    ayuda a adaptarnos, recuperarnos y seguir adelante después de
                                    experiencias difíciles.
                                </text>
                            </p>
                            <p>
                                <h4>
                                    ¿Cuáles son los beneficios de utilizar una aplicación de salud
                                    mental?
                                </h4>
                                <text>
                                    Utilizar una aplicación de salud mental puede brindar una serie de
                                    beneficios para el bienestar emocional y psicológico de las
                                    personas. Algunos de los beneficios de utilizar una aplicación de
                                    salud mental son:
                                    <br />
                                    -Acceso conveniente: Las aplicaciones de salud mental proporcionan
                                    un acceso conveniente a recursos y herramientas que pueden ayudar
                                    a mejorar el bienestar mental. Puedes acceder a ellas desde tu
                                    dispositivo móvil en cualquier momento y lugar, lo que te permite
                                    obtener apoyo instantáneo cuando lo necesitas.
                                    <br />
                                    -Autonomía y control: Las aplicaciones de salud mental te permiten
                                    tener un mayor control sobre tu propio cuidado. Puedes elegir qué
                                    herramientas o técnicas utilizar, establecer tus propias metas y
                                    seguir tu progreso personal. Esto te brinda una sensación de
                                    autonomía y empoderamiento en tu proceso de bienestar mental.
                                    <br />
                                    -Herramientas de autogestión: Las aplicaciones de salud mental
                                    suelen ofrecer una variedad de herramientas de autogestión, como
                                    técnicas de relajación, meditación, ejercicios de respiración,
                                    seguimiento del estado de ánimo y diarios de emociones. Estas
                                    herramientas pueden ayudarte a gestionar el estrés, mejorar la
                                    resiliencia y promover el autocuidado.
                                </text>
                            </p>
                            <p>
                                <h4>
                                    ¿Cuáles son las características principales de la aplicación y
                                    cómo puedo aprovecharlas al máximo?
                                </h4>
                                <text>
                                    Nuestra aplicación es una herramienta integral para el cuidado de
                                    la salud mental que combina un chatbot inteligente, un directorio
                                    de especialistas en salud mental y una comunidad en línea.
                                    Diseñada para brindar apoyo y recursos accesibles, nuestra
                                    aplicación está destinada a mejorar el bienestar emocional y
                                    psicológico de los usuarios.
                                    <br />
                                    El chatbot inteligente es una función central de la aplicación.
                                    Mediante el uso de algoritmos avanzados de inteligencia
                                    artificial, el chatbot interactúa con los usuarios de manera
                                    conversacional, brindando orientación, información y técnicas de
                                    manejo del estrés. Puede responder preguntas frecuentes,
                                    proporcionar estrategias de autocuidado y recomendar actividades
                                    para mejorar el bienestar emocional.
                                    <br />
                                    Además, la aplicación cuenta con un directorio de especialistas en
                                    salud mental, donde los usuarios pueden encontrar y contactar a
                                    profesionales de confianza. El directorio incluye información
                                    detallada sobre los especialistas, como sus áreas de
                                    especialización, experiencia y opciones de consulta. Los usuarios
                                    pueden buscar profesionales según sus necesidades específicas y
                                    acceder a servicios de asesoramiento y terapia de manera
                                    conveniente.
                                    <br />
                                    Para fomentar la conexión y el apoyo mutuo, la aplicación también
                                    ofrece una comunidad en línea. Los usuarios pueden unirse a grupos
                                    temáticos, participar en discusiones y compartir experiencias con
                                    otros miembros de la comunidad que comparten preocupaciones
                                    similares. Esto brinda un espacio seguro y acogedor para la
                                    interacción social, el intercambio de ideas y el apoyo mutuo.
                                </text>
                            </p>
                            <p>
                                <h4>
                                    ¿La aplicación garantiza la confidencialidad y privacidad de mis
                                    datos personales?
                                </h4>
                                <text>
                                    Sí, nuestra aplicación garantiza la confidencialidad y privacidad
                                    de tus datos personales. Implementamos medidas de seguridad
                                    sólidas para proteger la información que nos proporcionas.
                                    Cumplimos con las regulaciones y normativas de protección de datos
                                    aplicables y seguimos las mejores prácticas de seguridad de la
                                    industria. Tus datos personales serán tratados de manera
                                    confidencial y solo se utilizarán con el propósito de brindarte el
                                    servicio y mejorar tu experiencia en la aplicación. No
                                    compartiremos tu información con terceros sin tu consentimiento
                                    expreso, a menos que sea requerido por la ley. Puedes tener la
                                    tranquilidad de que tu privacidad y seguridad son de suma
                                    importancia para nosotros.
                                </text>
                            </p>
                            <p>
                                <h4>
                                    ¿Cómo puedo encontrar recursos adicionales de apoyo, como líneas
                                    de ayuda o servicios de emergencia?
                                </h4>
                                <text>
                                    En nuestra aplicación, hemos creado una sección dedicada
                                    especialmente a proporcionar recursos adicionales de apoyo, como
                                    líneas de ayuda y servicios de emergencia. En esta sección,
                                    encontrarás información detallada sobre organizaciones y contactos
                                    externos que brindan asistencia profesional y apoyo en situaciones
                                    de crisis. Estos recursos están disponibles para que los usuarios
                                    puedan acceder a ellos cuando sea necesario y obtener el apoyo
                                    adecuado en momentos de urgencia. Reconocemos la importancia de
                                    contar con opciones de ayuda externa y nos hemos asegurado de
                                    incluir esta sección en nuestra aplicación para brindarte una guía
                                    fácil de seguir y conectarte con los recursos adecuados en caso de
                                    necesidad.
                                </text>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Contact;