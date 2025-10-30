import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [mainBalance] = useState(0);
  const [bonusBalance] = useState(0);

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
          
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]">
              <Icon name="Headset" size={18} className="mr-2" />
              Техподдержка
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]">
              <Icon name="Handshake" size={18} className="mr-2" />
              Сотрудничество
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#8B5CF6]" onClick={() => navigate('/promotion')}>
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Накрутка
            </Button>
            <Button variant="ghost" className="text-white hover:text-[#D946EF]" onClick={() => navigate('/admin')}>
              <Icon name="Settings" size={18} className="mr-2" />
              Управление
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            className="h-auto py-8 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] hover:opacity-90 border-0 text-white flex flex-col items-center gap-3 rounded-2xl shadow-xl"
            onClick={() => navigate('/card')}
          >
            <Icon name="CreditCard" size={40} />
            <span className="text-lg font-bold">Карта</span>
          </Button>

          <Button 
            className="h-auto py-8 bg-gradient-to-br from-[#F97316] to-[#EA384C] hover:opacity-90 border-0 text-white flex flex-col items-center gap-3 rounded-2xl shadow-xl"
          >
            <Icon name="Wallet" size={40} />
            <span className="text-lg font-bold">Баланс</span>
          </Button>

          <Button 
            className="h-auto py-8 bg-gradient-to-br from-[#0EA5E9] to-[#8B5CF6] hover:opacity-90 border-0 text-white flex flex-col items-center gap-3 rounded-2xl shadow-xl"
            onClick={() => navigate('/referral')}
          >
            <Icon name="Users" size={40} />
            <span className="text-lg font-bold">Рефералы</span>
          </Button>

          <Button 
            className="h-auto py-8 bg-gradient-to-br from-[#10B981] to-[#059669] hover:opacity-90 border-0 text-white flex flex-col items-center gap-3 rounded-2xl shadow-xl"
            onClick={() => navigate('/withdraw')}
          >
            <Icon name="Download" size={40} />
            <span className="text-lg font-bold">Вывод</span>
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