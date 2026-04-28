import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const Privacy = () => {
  useEffect(() => {
    document.title = "Политика обработки персональных данных — ЕРМАК";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container-luxe py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight mb-12">
            Политика обработки персональных данных
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="text-foreground/60 text-sm mb-8 font-light">
              г. Ростов-на-Дону<br />
              28.04.2026
            </div>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.1. Настоящая Политика обработки персональных данных (далее — «Политика») разработана в соответствии с Федеральным законом №152-ФЗ «О персональных данных».
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.2. Оператором персональных данных является:
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed ml-4">
                Куценко Станислав Олегович, самозанятый<br />
                ИНН: 640701170860
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.3. Настоящая Политика применяется ко всем персональным данным, которые Оператор может получить от пользователей сайта:
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed ml-4">
                <a href="https://ermakshop.ru/" className="text-gold hover:underline">https://ermakshop.ru/</a>
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.4. Использование сайта означает согласие пользователя с настоящей Политикой.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">2. ОСНОВНЫЕ ПОНЯТИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                2.1. Персональные данные — любая информация, относящаяся к прямо или косвенно определенному физическому лицу.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                2.2. Обработка персональных данных — любое действие с данными (сбор, запись, хранение, использование, передача, удаление и др.).
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                2.3. Оператор — лицо, организующее обработку персональных данных.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">3. СОСТАВ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                3.1. Оператор может обрабатывать следующие данные:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>ФИО</li>
                <li>номер телефона</li>
                <li>адрес доставки</li>
                <li>адрес электронной почты</li>
                <li>IP-адрес</li>
                <li>данные cookies</li>
                <li>информация о действиях пользователя на сайте</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                3.2. Платежные данные обрабатываются платежными системами и не хранятся Оператором.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">4. ЦЕЛИ ОБРАБОТКИ ДАННЫХ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                Персональные данные обрабатываются в целях:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>оформления и исполнения заказов</li>
                <li>доставки товаров</li>
                <li>связи с пользователем</li>
                <li>выполнения требований законодательства РФ</li>
                <li>улучшения качества работы сайта</li>
                <li>проведения аналитики</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">5. ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                5.1. Обработка осуществляется на основании:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>Федерального закона №152-ФЗ</li>
                <li>Гражданского кодекса РФ</li>
                <li>согласия субъекта персональных данных</li>
                <li>заключения и исполнения договора</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">6. ПОРЯДОК И УСЛОВИЯ ОБРАБОТКИ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.1. Обработка осуществляется законно и справедливо.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.2. Допускается как автоматизированная, так и неавтоматизированная обработка.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.3. Оператор принимает меры для защиты данных от:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>неправомерного доступа</li>
                <li>изменения</li>
                <li>раскрытия</li>
                <li>уничтожения</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">7. ПЕРЕДАЧА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.1. Оператор вправе передавать данные третьим лицам исключительно для исполнения договора:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>курьерские службы</li>
                <li>Почта России</li>
                <li>транспортные компании</li>
                <li>платежные системы</li>
                <li>хостинг-провайдеры</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.2. Передача осуществляется при условии соблюдения конфиденциальности.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">8. СРОКИ ХРАНЕНИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                8.1. Персональные данные хранятся не дольше, чем это необходимо для целей обработки.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                8.2. По достижении целей данные удаляются или обезличиваются.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">9. ПРАВА СУБЪЕКТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                Пользователь имеет право:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>получать информацию о своих данных</li>
                <li>требовать их уточнения</li>
                <li>требовать удаления или блокировки</li>
                <li>отозвать согласие на обработку</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">10. ОТЗЫВ СОГЛАСИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                10.1. Пользователь может отозвать согласие, направив запрос на email:
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed ml-4">
                <a href="mailto:kutzenko.monik@yandex.ru" className="text-gold hover:underline">kutzenko.monik@yandex.ru</a>
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                10.2. После получения запроса обработка прекращается, если иное не предусмотрено законодательством.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">11. COOKIES</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                11.1. Сайт использует cookies для:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>корректной работы</li>
                <li>аналитики</li>
                <li>улучшения пользовательского опыта</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                11.2. Пользователь может отключить cookies в настройках браузера.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">12. ЗАЩИТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                Оператор применяет:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>ограничение доступа к данным</li>
                <li>использование защищенных протоколов (HTTPS/SSL)</li>
                <li>внутренние меры безопасности</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">13. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                13.1. Оператор вправе вносить изменения в Политику.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                13.2. Актуальная версия размещается на сайте.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                13.3. Политика действует бессрочно до замены новой редакцией.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
