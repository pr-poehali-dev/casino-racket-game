import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Promotion = () => {
  const navigate = useNavigate();
  const [balance] = useState(1500);
  const [telegramChannel, setTelegramChannel] = useState('');
  const [subscribersCount, setSubscribersCount] = useState(100);
  const [tiktokLink, setTiktokLink] = useState('');
  const [tiktokType, setTiktokType] = useState('followers');

  const prices = {
    telegram: {
      subscribers: 50,
      members: 30,
    },
    tiktok: {
      followers: 80,
      likes: 20,
      views: 10,
    }
  };

  const calculatePrice = (type: string, count: number) => {
    if (type === 'telegram') {
      return Math.floor(count * (prices.telegram.subscribers / 100));
    } else {
      return Math.floor(count * (prices.tiktok[tiktokType as keyof typeof prices.tiktok] / 100));
    }
  };

  const handleOrder = (type: string) => {
    const price = calculatePrice(type, subscribersCount);
    if (price > balance) {
      toast.error('Недостаточно средств на балансе');
      return;
    }
    toast.success(`Заказ на ${subscribersCount} ${type === 'telegram' ? 'подписчиков' : tiktokType} оформлен!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-xl font-bold text-white">Накрутка</h1>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold flex items-center gap-2">
            <Icon name="Wallet" size={16} />
            {balance.toLocaleString()} ₽
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md mb-6">
          <div className="text-center mb-6">
            <Icon name="TrendingUp" size={48} className="mx-auto mb-3 text-[#8B5CF6]" />
            <h2 className="text-2xl font-bold text-white mb-2">Накрутка подписчиков</h2>
            <p className="text-white/70">Увеличьте популярность ваших каналов</p>
          </div>

          <Tabs defaultValue="telegram" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10">
              <TabsTrigger value="telegram" className="data-[state=active]:bg-[#8B5CF6]">
                <Icon name="Send" size={18} className="mr-2" />
                Telegram
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="data-[state=active]:bg-[#D946EF]">
                <Icon name="Music" size={18} className="mr-2" />
                TikTok
              </TabsTrigger>
            </TabsList>

            <TabsContent value="telegram" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 text-white text-center">
                  <Icon name="Users" size={32} className="mx-auto mb-2" />
                  <div className="text-2xl font-bold">{prices.telegram.subscribers}₽</div>
                  <div className="text-sm opacity-90">за 100 подписчиков</div>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-[#0EA5E9] to-[#8B5CF6] border-0 text-white text-center">
                  <Icon name="MessageSquare" size={32} className="mx-auto mb-2" />
                  <div className="text-2xl font-bold">{prices.telegram.members}₽</div>
                  <div className="text-sm opacity-90">за 100 участников чата</div>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Ссылка на канал/чат</Label>
                  <Input 
                    placeholder="https://t.me/your_channel"
                    value={telegramChannel}
                    onChange={(e) => setTelegramChannel(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Количество подписчиков</Label>
                  <div className="flex items-center gap-3">
                    <Input 
                      type="number"
                      min="100"
                      step="100"
                      value={subscribersCount}
                      onChange={(e) => setSubscribersCount(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <div className="text-white font-bold whitespace-nowrap">
                      = {calculatePrice('telegram', subscribersCount)}₽
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-white font-bold text-lg"
                  onClick={() => handleOrder('telegram')}
                  disabled={!telegramChannel}
                >
                  Заказать накрутку
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tiktok" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <Card 
                  className={`p-4 border-2 cursor-pointer transition-all ${
                    tiktokType === 'followers' 
                      ? 'bg-gradient-to-br from-[#D946EF] to-[#F97316] border-0 text-white' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => setTiktokType('followers')}
                >
                  <Icon name="Users" size={28} className="mx-auto mb-2" />
                  <div className="text-center">
                    <div className="text-xl font-bold">{prices.tiktok.followers}₽</div>
                    <div className="text-xs">за 100 подписчиков</div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 border-2 cursor-pointer transition-all ${
                    tiktokType === 'likes' 
                      ? 'bg-gradient-to-br from-[#D946EF] to-[#F97316] border-0 text-white' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => setTiktokType('likes')}
                >
                  <Icon name="Heart" size={28} className="mx-auto mb-2" />
                  <div className="text-center">
                    <div className="text-xl font-bold">{prices.tiktok.likes}₽</div>
                    <div className="text-xs">за 100 лайков</div>
                  </div>
                </Card>

                <Card 
                  className={`p-4 border-2 cursor-pointer transition-all ${
                    tiktokType === 'views' 
                      ? 'bg-gradient-to-br from-[#D946EF] to-[#F97316] border-0 text-white' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                  onClick={() => setTiktokType('views')}
                >
                  <Icon name="Eye" size={28} className="mx-auto mb-2" />
                  <div className="text-center">
                    <div className="text-xl font-bold">{prices.tiktok.views}₽</div>
                    <div className="text-xs">за 100 просмотров</div>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Ссылка на TikTok профиль/видео</Label>
                  <Input 
                    placeholder="https://tiktok.com/@username"
                    value={tiktokLink}
                    onChange={(e) => setTiktokLink(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">
                    Количество {tiktokType === 'followers' ? 'подписчиков' : tiktokType === 'likes' ? 'лайков' : 'просмотров'}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input 
                      type="number"
                      min="100"
                      step="100"
                      value={subscribersCount}
                      onChange={(e) => setSubscribersCount(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <div className="text-white font-bold whitespace-nowrap">
                      = {calculatePrice('tiktok', subscribersCount)}₽
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 bg-gradient-to-r from-[#D946EF] to-[#F97316] hover:opacity-90 text-white font-bold text-lg"
                  onClick={() => handleOrder('tiktok')}
                  disabled={!tiktokLink}
                >
                  Заказать накрутку
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Icon name="Info" size={20} className="text-[#8B5CF6]" />
            Как это работает?
          </h3>
          <div className="space-y-3 text-white/80">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
              <p>Выберите платформу (Telegram или TikTok)</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
              <p>Укажите ссылку на канал/профиль/видео</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
              <p>Выберите количество подписчиков/лайков/просмотров</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
              <p>Оплата списывается с вашего баланса автоматически</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-sm font-bold">5</div>
              <p>Накрутка начнется в течение 24 часов</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Promotion;
