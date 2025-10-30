import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CardPage = () => {
  const navigate = useNavigate();

  const handleCardOrder = () => {
    toast.success('Переход на страницу оформления карты...');
  };

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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 text-white mb-6">
          <div className="text-center mb-6">
            <Icon name="CreditCard" size={64} className="mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Получите 500₽ бонусом</h2>
            <p className="text-xl opacity-90">За оформление банковской карты</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 mb-6">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Icon name="CreditCard" size={64} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-70">Дизайн карты</p>
              </div>
            </div>
          </div>

          <Button 
            size="lg"
            className="w-full bg-white text-[#8B5CF6] hover:bg-white/90 font-bold text-lg h-14"
            onClick={handleCardOrder}
          >
            Оформить карту
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-white/5 border-white/10 text-center">
            <Icon name="Gift" size={40} className="mx-auto mb-3 text-[#8B5CF6]" />
            <h3 className="text-white font-bold mb-2">500₽ бонусом</h3>
            <p className="text-sm text-white/70">Начисление сразу после оформления</p>
          </Card>

          <Card className="p-6 bg-white/5 border-white/10 text-center">
            <Icon name="Zap" size={40} className="mx-auto mb-3 text-[#D946EF]" />
            <h3 className="text-white font-bold mb-2">Быстро</h3>
            <p className="text-sm text-white/70">Оформление за 5 минут онлайн</p>
          </Card>

          <Card className="p-6 bg-white/5 border-white/10 text-center">
            <Icon name="Shield" size={40} className="mx-auto mb-3 text-[#F97316]" />
            <h3 className="text-white font-bold mb-2">Безопасно</h3>
            <p className="text-sm text-white/70">Надежная защита данных</p>
          </Card>
        </div>

        <Card className="p-6 bg-white/5 border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Преимущества карты</h3>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <span>Кэшбэк до 10% в любимых категориях</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <span>Бесплатное обслуживание при любом балансе</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <span>Процент на остаток до 8% годовых</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <span>Бесплатные переводы и снятие наличных</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <span>Доставка карты в течение 3 дней</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default CardPage;
