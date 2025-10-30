import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Referral = () => {
  const navigate = useNavigate();
  const [referralLink] = useState('https://rocketqueen.app/ref/USER123');
  const [referrals] = useState([
    { name: 'Александр', date: '28.10.2025', bonus: 200 },
    { name: 'Мария', date: '25.10.2025', bonus: 200 },
    { name: 'Дмитрий', date: '20.10.2025', bonus: 200 },
  ]);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-xl font-bold text-white">Реферальная программа</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 text-white mb-6">
          <div className="text-center mb-6">
            <Icon name="Users" size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Приглашайте друзей</h2>
            <p className="text-lg opacity-90">Получайте 200₽ за каждого друга, оформившего карту</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-white/20">
              <div className="text-3xl font-bold">{referrals.length}</div>
              <div className="text-sm opacity-90 mt-1">Рефералов</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/20">
              <div className="text-3xl font-bold">{referrals.length * 200}</div>
              <div className="text-sm opacity-90 mt-1">Заработано ₽</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/20">
              <div className="text-3xl font-bold">200₽</div>
              <div className="text-sm opacity-90 mt-1">За реферала</div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <label className="text-sm mb-2 block opacity-90">Ваша реферальная ссылка</label>
            <div className="flex gap-2">
              <Input 
                value={referralLink}
                readOnly
                className="bg-white/20 border-0 text-white"
              />
              <Button 
                className="bg-white text-[#8B5CF6] hover:bg-white/90"
                onClick={copyLink}
              >
                <Icon name="Copy" size={20} />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
          <h3 className="text-xl font-bold text-white mb-4">Ваши рефералы</h3>
          
          {referrals.length > 0 ? (
            <div className="space-y-3">
              {referrals.map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{ref.name}</div>
                      <div className="text-sm text-white/60">{ref.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">+{ref.bonus}₽</div>
                    <div className="text-xs text-white/60">Бонус начислен</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/60">
              <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
              <p>У вас пока нет рефералов</p>
            </div>
          )}
        </Card>

        <Card className="mt-6 p-6 bg-white/5 border-white/10 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-4">Как это работает?</h3>
          <div className="space-y-4 text-white/80">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">1</div>
              <p>Поделитесь своей реферальной ссылкой с друзьями</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">2</div>
              <p>Ваш друг переходит по ссылке и оформляет карту</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0">3</div>
              <p>Вам автоматически начисляется 200₽ на бонусный баланс</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Referral;
