import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'card' | 'sbp' | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleDeposit = (selectedMethod: 'card' | 'sbp') => {
    if (!amount || Number(amount) < 100) {
      toast.error('Минимальная сумма пополнения 100₽');
      return;
    }
    setMethod(selectedMethod);
    setTimeLeft(300);
    toast.success('Ожидание оплаты...');
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setMethod(null);
          toast.error('Время истекло. Создайте новую заявку на пополнение');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-xl font-bold text-white">Пополнение</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {!method ? (
          <>
            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md mb-6">
              <h2 className="text-xl font-bold text-white mb-6">Пополнить основной баланс</h2>

              <div className="mb-6">
                <label className="text-white text-sm mb-2 block">Сумма пополнения (₽)</label>
                <Input 
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg"
                />
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map(val => (
                    <Button
                      key={val}
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      onClick={() => setAmount(val.toString())}
                    >
                      {val}₽
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-white/60 mt-2">Минимальная сумма: 100₽</p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-14 bg-white/10 hover:bg-white/20 border border-white/20 text-white justify-start text-base"
                  onClick={() => handleDeposit('card')}
                >
                  <Icon name="CreditCard" size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="font-bold">Банковская карта</div>
                    <div className="text-xs opacity-70">Visa, Mastercard, МИР</div>
                  </div>
                </Button>

                <Button
                  className="w-full h-14 bg-white/10 hover:bg-white/20 border border-white/20 text-white justify-start text-base"
                  onClick={() => handleDeposit('sbp')}
                >
                  <Icon name="Smartphone" size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="font-bold">СБП</div>
                    <div className="text-xs opacity-70">Система быстрых платежей</div>
                  </div>
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-white/5 border-white/10">
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <Icon name="Info" size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="mb-2">Пополнение происходит мгновенно</p>
                  <p className="mb-2">Комиссия: 0%</p>
                  <p>Время на оплату: 5 минут</p>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center">
                <Icon name="Clock" size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Ожидание оплаты</h2>
              <p className="text-white/70">Время на оплату:</p>
              <div className="text-4xl font-bold text-white mt-2">{formatTime(timeLeft)}</div>
            </div>

            <Card className="p-6 bg-white/10 border-white/20 mb-6">
              <div className="text-white/70 text-sm mb-2">Сумма к оплате</div>
              <div className="text-3xl font-bold text-white">{amount}₽</div>
            </Card>

            {method === 'card' && (
              <div className="text-white/70 mb-6">
                <p>Перейдите на страницу оплаты и введите данные карты</p>
              </div>
            )}

            {method === 'sbp' && (
              <div className="text-white/70 mb-6">
                <p>Отсканируйте QR-код в приложении вашего банка</p>
              </div>
            )}

            <Button
              className="w-full bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setMethod(null)}
            >
              Отменить
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Deposit;
