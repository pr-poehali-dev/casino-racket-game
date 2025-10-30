import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [bank, setBank] = useState('');
  const bonusBalance = 500;
  const mainBalance = 5000;

  const handleWithdraw = () => {
    if (!amount || !phone || !bank) {
      toast.error('Заполните все поля');
      return;
    }
    if (Number(amount) < 100) {
      toast.error('Минимальная сумма вывода 100₽');
      return;
    }
    if (Number(amount) > (bonusBalance + mainBalance)) {
      toast.error('Недостаточно средств');
      return;
    }
    toast.success('Заявка на вывод отправлена! Средства поступят в течение 5 минут');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-xl font-bold text-white">Вывод средств</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-[#F97316] to-[#EA384C] border-0 text-white">
            <div className="text-sm opacity-90 mb-1">Бонусный баланс</div>
            <div className="text-2xl font-bold">{bonusBalance.toLocaleString()} ₽</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 text-white">
            <div className="text-sm opacity-90 mb-1">Основной баланс</div>
            <div className="text-2xl font-bold">{mainBalance.toLocaleString()} ₽</div>
          </Card>
        </div>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Вывод через СБП</h2>

          <div className="space-y-4">
            <div>
              <label className="text-white text-sm mb-2 block">Сумма вывода (₽)</label>
              <Input 
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
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

            <div>
              <label className="text-white text-sm mb-2 block">Номер телефона</label>
              <Input 
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Банк получателя</label>
              <Select value={bank} onValueChange={setBank}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Выберите банк" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sber">Сбербанк</SelectItem>
                  <SelectItem value="tinkoff">Тинькофф</SelectItem>
                  <SelectItem value="alfa">Альфа-Банк</SelectItem>
                  <SelectItem value="vtb">ВТБ</SelectItem>
                  <SelectItem value="raif">Райффайзен</SelectItem>
                  <SelectItem value="other">Другой банк</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-white font-bold text-lg"
              onClick={handleWithdraw}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Вывести средства
            </Button>
          </div>
        </Card>

        <Card className="p-4 bg-white/5 border-white/10">
          <div className="flex items-start gap-3 text-white/70 text-sm">
            <Icon name="Info" size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="mb-2">Вывод средств осуществляется автоматически через Систему Быстрых Платежей (СБП)</p>
              <p className="mb-2">Время зачисления: до 5 минут</p>
              <p>Комиссия: 0%</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Withdraw;
