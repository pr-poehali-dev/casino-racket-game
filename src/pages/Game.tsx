import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Game = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(5000);
  const [betAmount, setBetAmount] = useState(100);
  const [autoCashout, setAutoCashout] = useState(2.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setMultiplier(prev => {
          const newValue = prev + Math.random() * 0.05;
          if (newValue >= autoCashout) {
            cashOut();
            return newValue;
          }
          if (Math.random() < 0.01) {
            crashed();
            return 1.0;
          }
          return newValue;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, autoCashout]);

  const placeBet = () => {
    if (betAmount > balance) {
      toast.error('Недостаточно средств');
      return;
    }
    setBalance(prev => prev - betAmount);
    setIsWaiting(true);
    setMultiplier(1.0);
    
    setTimeout(() => {
      setIsWaiting(false);
      setIsPlaying(true);
    }, 2000);
  };

  const cashOut = () => {
    const winAmount = Math.floor(betAmount * multiplier);
    setBalance(prev => prev + winAmount);
    toast.success(`Выигрыш: ${winAmount}₽ (x${multiplier.toFixed(2)})`);
    resetGame();
  };

  const crashed = () => {
    toast.error('Ракета взорвалась!');
    resetGame();
  };

  const resetGame = () => {
    setIsPlaying(false);
    setMultiplier(1.0);
    setIsWaiting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-white/10 text-white font-semibold">
              <Icon name="Wallet" size={16} className="inline mr-2" />
              {balance.toLocaleString()} ₽
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 border-0 mb-6 h-[400px] flex items-center justify-center">
          {isWaiting ? (
            <div className="text-center text-white">
              <div className="animate-spin w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
              <p className="text-xl font-bold">ОЖИДАНИЕ СЛЕДУЮЩЕГО РАУНДА</p>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-8xl font-bold text-white mb-4 ${isPlaying ? 'animate-pulse' : ''}`}>
                x{multiplier.toFixed(2)}
              </div>
              {isPlaying && (
                <div className="animate-bounce">
                  🚀
                </div>
              )}
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-sm">
            <span>Ставок: 133</span>
            <span>Макс: x22.09</span>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-[#2A2540] border-[#3D3558]">
            <div className="mb-4">
              <label className="text-white text-sm mb-2 block">Сумма ставки</label>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setBetAmount(prev => Math.max(10, prev - 10))}
                  disabled={isPlaying || isWaiting}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <Input 
                  type="number" 
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white text-center text-lg font-bold"
                  disabled={isPlaying || isWaiting}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setBetAmount(prev => prev + 10)}
                  disabled={isPlaying || isWaiting}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                {[5, 25, 50, 100].map(amount => (
                  <Button 
                    key={amount}
                    variant="outline" 
                    size="sm"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    onClick={() => setBetAmount(prev => prev + amount)}
                    disabled={isPlaying || isWaiting}
                  >
                    +{amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white text-sm mb-2 block">Автовывод при x{autoCashout.toFixed(2)}</label>
              <Input 
                type="number" 
                step="0.1"
                value={autoCashout}
                onChange={(e) => setAutoCashout(Number(e.target.value))}
                className="bg-white/10 border-white/20 text-white text-center text-lg font-bold"
                disabled={isPlaying || isWaiting}
              />
            </div>

            {isPlaying ? (
              <Button 
                className="w-full h-14 text-lg font-bold bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                onClick={cashOut}
              >
                Забрать {Math.floor(betAmount * multiplier)}₽
              </Button>
            ) : (
              <Button 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-white"
                onClick={placeBet}
                disabled={isWaiting}
              >
                {isWaiting ? 'Ожидание...' : 'СТАВКА'}
              </Button>
            )}
          </Card>

          <Card className="p-6 bg-[#2A2540] border-[#3D3558]">
            <h3 className="text-white font-bold mb-4">Последние игры</h3>
            <div className="space-y-2">
              {[22.09, 1.15, 3.45, 1.89, 5.67].map((mult, i) => (
                <div 
                  key={i}
                  className={`p-3 rounded-lg ${mult > 2 ? 'bg-green-500/20' : 'bg-red-500/20'} flex justify-between items-center`}
                >
                  <span className="text-white text-sm">Раунд #{1000 - i}</span>
                  <span className={`font-bold ${mult > 2 ? 'text-green-400' : 'text-red-400'}`}>
                    x{mult.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Game;
