import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [mainBalance] = useState(5000);
  const [bonusBalance] = useState(500);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center">
              <Icon name="Rocket" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">RocketQueen</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]" onClick={() => navigate('/card')}>
              <Icon name="CreditCard" size={18} className="mr-2" />
              Карта
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]" onClick={() => navigate('/referral')}>
              <Icon name="Users" size={18} className="mr-2" />
              Рефералы
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]" onClick={() => navigate('/withdraw')}>
              <Icon name="Download" size={18} className="mr-2" />
              Вывод
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]" onClick={() => navigate('/deposit')}>
              <Icon name="Upload" size={18} className="mr-2" />
              Пополнить
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]" onClick={() => navigate('/game')}>
              <Icon name="Gamepad2" size={18} className="mr-2" />
              Игра
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Основной баланс</span>
              <Icon name="Wallet" size={20} />
            </div>
            <div className="text-3xl font-bold">{mainBalance.toLocaleString()} ₽</div>
            <p className="text-xs mt-2 opacity-80">Для игр и операций</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#F97316] to-[#EA384C] border-0 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Бонусный баланс</span>
              <Icon name="Gift" size={20} />
            </div>
            <div className="text-3xl font-bold">{bonusBalance.toLocaleString()} ₽</div>
            <p className="text-xs mt-2 opacity-80">Только для вывода</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            className="h-auto py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex flex-col items-center gap-2"
            onClick={() => navigate('/game')}
          >
            <Icon name="Rocket" size={32} />
            <span className="text-lg font-semibold">Играть</span>
          </Button>

          <Button 
            className="h-auto py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex flex-col items-center gap-2"
            onClick={() => navigate('/deposit')}
          >
            <Icon name="CreditCard" size={32} />
            <span className="text-lg font-semibold">Пополнить</span>
          </Button>

          <Button 
            className="h-auto py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex flex-col items-center gap-2"
          >
            <Icon name="History" size={32} />
            <span className="text-lg font-semibold">История</span>
          </Button>

          <Button 
            className="h-auto py-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex flex-col items-center gap-2"
          >
            <Icon name="Heart" size={32} />
            <span className="text-lg font-semibold">Донат</span>
          </Button>
        </div>

        <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white mb-6">Добро пожаловать в RocketQueen! 🚀</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <Icon name="Gift" size={32} className="text-[#8B5CF6] mb-3" />
              <h3 className="font-semibold mb-2">Бонус за карту</h3>
              <p className="text-sm opacity-80">Оформите карту и получите 500₽ на бонусный баланс</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <Icon name="Users" size={32} className="text-[#D946EF] mb-3" />
              <h3 className="font-semibold mb-2">Реферальная программа</h3>
              <p className="text-sm opacity-80">200₽ за каждого друга, оформившего карту</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <Icon name="Zap" size={32} className="text-[#F97316] mb-3" />
              <h3 className="font-semibold mb-2">Быстрый вывод</h3>
              <p className="text-sm opacity-80">Автоматический вывод через СБП</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;