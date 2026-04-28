import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const Offer = () => {
  useEffect(() => {
    document.title = "Договор публичной оферты — ЕРМАК";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container-luxe py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight mb-12">
            Договор публичной оферты
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="text-foreground/60 text-sm mb-8 font-light">
              г. Краснодар<br />
              28.04.2026
            </div>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.1. Гражданин РФ Куценко Станислав Олегович, применяющий специальный налоговый режим «Налог на профессиональный доход» (самозанятый), ИНН 640701170860, именуемый в дальнейшем «Продавец», настоящим предлагает заключить договор купли-продажи товаров дистанционным способом.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.2. Настоящий документ является публичной офертой в соответствии со ст. 437 Гражданского кодекса РФ.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.3. Акцептом настоящей оферты является совершение Покупателем одного из следующих действий:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>оформление заказа на сайте https://ermakshop.ru/</li>
                <li>оплата товара</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                1.4. Совершая акцепт, Покупатель подтверждает:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>полное и безоговорочное принятие условий настоящей оферты</li>
                <li>согласие с условиями обработки персональных данных</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">2. ПРЕДМЕТ ДОГОВОРА</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                2.1. Продавец обязуется передать в собственность Покупателю товар — одежду для казаков собственного производства, а Покупатель обязуется оплатить и принять товар.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                2.2. Ассортимент, характеристики, описание и цена товара размещаются на сайте Продавца.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                2.3. Договор считается заключенным с момента акцепта оферты.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">3. ПОРЯДОК ОФОРМЛЕНИЯ ЗАКАЗА</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                3.1. Заказ оформляется Покупателем самостоятельно через сайт.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                3.2. При оформлении заказа Покупатель обязуется предоставить достоверную информацию:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>ФИО</li>
                <li>номер телефона</li>
                <li>адрес доставки</li>
                <li>адрес электронной почты (при наличии)</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                3.3. Продавец не несет ответственности за последствия предоставления недостоверных данных.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                3.4. Продавец вправе связаться с Покупателем для подтверждения заказа.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">4. ЦЕНА ТОВАРА</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                4.1. Цена указывается на сайте в рублях РФ.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                4.2. Цена может быть изменена Продавцом в одностороннем порядке до момента оформления заказа.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                4.3. После оформления заказа цена изменению не подлежит.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">5. ОПЛАТА</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                5.1. Оплата осуществляется через систему быстрых платежей (СБП).
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                5.2. Обязательство по оплате считается исполненным с момента поступления денежных средств Продавцу.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                5.3. При необходимости Покупателю предоставляется чек в соответствии с законодательством РФ (НПД).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">6. ДОСТАВКА</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.1. Доставка осуществляется по территории Российской Федерации.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.2. Возможные способы доставки:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>курьерские службы</li>
                <li>Почта России</li>
                <li>транспортные компании</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.3. Сроки доставки зависят от региона и службы доставки.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                6.4. Риск случайной гибели или повреждения товара переходит к Покупателю с момента передачи товара перевозчику.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">7. ВОЗВРАТ И ОБМЕН ТОВАРА</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.1. Возврат и обмен товара осуществляется в соответствии с законодательством РФ, включая Закон РФ «О защите прав потребителей».
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.2. Покупатель вправе отказаться от товара надлежащего качества в течение 7 (семи) дней с момента получения.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.3. Возврат возможен при соблюдении условий:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>сохранен товарный вид</li>
                <li>сохранены потребительские свойства</li>
                <li>товар не был в употреблении</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.4. Расходы по возврату товара надлежащего качества несет Покупатель.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                7.5. В случае обнаружения недостатков товара Покупатель вправе предъявить требования, предусмотренные законодательством РФ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">8. ОТВЕТСТВЕННОСТЬ СТОРОН</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                8.1. Стороны несут ответственность в соответствии с законодательством РФ.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                8.2. Продавец не несет ответственности за:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>задержки доставки по вине третьих лиц</li>
                <li>действия служб доставки</li>
                <li>неправильное использование товара</li>
                <li>невозможность выполнения обязательств по независящим причинам (форс-мажор)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">9. ПЕРСОНАЛЬНЫЕ ДАННЫЕ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                9.1. Обработка персональных данных осуществляется в соответствии с Федеральным законом №152-ФЗ.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                9.2. Акцепт оферты означает согласие Покупателя на обработку персональных данных.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                9.3. Персональные данные используются исключительно для:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>исполнения договора</li>
                <li>доставки товара</li>
                <li>связи с Покупателем</li>
              </ul>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                9.4. Подробные условия обработки персональных данных размещены по адресу:
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                <a href="/privacy" className="text-gold hover:underline">https://ermakshop.ru/privacy</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">10. ФОРС-МАЖОР</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                10.1. Стороны освобождаются от ответственности за неисполнение обязательств при наступлении обстоятельств непреодолимой силы:
              </p>
              <ul className="list-disc list-inside mb-4 text-foreground/80 leading-relaxed ml-6">
                <li>стихийные бедствия</li>
                <li>военные действия</li>
                <li>сбои в работе инфраструктуры</li>
                <li>действия государственных органов</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">11. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                11.1. Продавец вправе изменять условия настоящей оферты без предварительного уведомления.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                11.2. Актуальная версия размещается на сайте.
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                11.3. К отношениям сторон применяется законодательство Российской Федерации.
              </p>
            </section>

            <section className="mb-8 p-6 bg-surface/40 border border-border/40">
              <h2 className="font-serif text-2xl text-foreground mb-4">РЕКВИЗИТЫ ПРОДАВЦА</h2>
              <div className="text-foreground/80 leading-relaxed space-y-2">
                <p>ФИО: Куценко Станислав Олегович</p>
                <p>Статус: самозанятый (НПД)</p>
                <p>ИНН: 640701170860</p>
                <p>Сайт: <a href="https://ermakshop.ru/" className="text-gold hover:underline">https://ermakshop.ru/</a></p>
                <p>Email: <a href="mailto:kutzenko.monik@yandex.ru" className="text-gold hover:underline">kutzenko.monik@yandex.ru</a></p>
                <p>Город: Краснодар</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Offer;
