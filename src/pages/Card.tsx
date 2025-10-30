import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const CardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-xl font-bold text-white">Оформление карты</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md text-white mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold mb-4">Привет, друзья!</h2>
            <p className="text-xl opacity-90 mb-2">У нас отличная новость!</p>
          </div>

          <div className="bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] rounded-2xl p-6 mb-6">
            <div className="text-center">
              <p className="text-lg mb-3">Вы можете получить</p>
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="bg-white/20 rounded-xl px-6 py-3">
                  <div className="text-3xl font-bold">500 ₽</div>
                  <div className="text-sm opacity-90">от нас</div>
                </div>
                <div className="text-2xl">+</div>
                <div className="bg-white/20 rounded-xl px-6 py-3">
                  <div className="text-3xl font-bold">500 ₽</div>
                  <div className="text-sm opacity-90">от Альфа-Банка</div>
                </div>
              </div>
              <div className="text-4xl font-bold bg-white/20 rounded-xl py-4 px-6 inline-block">
                = 1000 ₽
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-bold">Что нужно сделать?</h3>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <p className="mb-2">Оформить Альфа-Карту по ссылке:</p>
                <a 
                  href="https://alfa.me/ASQWHN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Icon name="ExternalLink" size={18} />
                  https://alfa.me/ASQWHN
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <p>Активировать карту в приложении</p>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <p>Сделать покупку от <span className="font-bold text-[#D946EF]">200 ₽</span></p>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 font-bold">4</div>
              <div>
                <p className="mb-2">Отправить чек сюда для выплаты 500 ₽:</p>
                <a 
                  href="https://t.me/Alfa_Bank778" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Icon name="Send" size={18} />
                  @Alfa_Bank778
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Icon name="Heart" size={24} className="text-red-400" />
              Преимущества Альфа-Карты
            </h3>
            <ul className="space-y-2 text-white/90">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span><strong>Бесплатное обслуживание</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span><strong>Кэшбэк каждый месяц</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Множество классных предложений от партнёров</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center text-lg opacity-90">
            ❤️ Не упустите шанс!
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CardPage;