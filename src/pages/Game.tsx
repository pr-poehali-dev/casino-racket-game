import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Game = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(10000);
  const [betAmount1, setBetAmount1] = useState(0.2);
  const [betAmount2, setBetAmount2] = useState(0.2);
  const [autoCashout1, setAutoCashout1] = useState(2.0);
  const [autoCashout2, setAutoCashout2] = useState(2.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitProgress, setWaitProgress] = useState(0);
  const [rocketPosition, setRocketPosition] = useState({ x: 10, y: 80 });
  const [history, setHistory] = useState([22.09, 1.15, 3.45, 1.89]);

  useEffect(() => {
    if (isWaiting) {
      const interval = setInterval(() => {
        setWaitProgress(prev => {
          if (prev >= 100) {
            setIsWaiting(false);
            setIsPlaying(true);
            setWaitProgress(0);
            return 0;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isWaiting]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setMultiplier(prev => {
          const newValue = prev + Math.random() * 0.03 + 0.02;
          
          setRocketPosition({
            x: Math.min(10 + (newValue - 1) * 15, 85),
            y: Math.max(80 - (newValue - 1) * 12, 10)
          });

          const crashChance = Math.min(0.005 + (newValue - 1) * 0.002, 0.05);
          if (Math.random() < crashChance) {
            crashed(newValue);
            return 1.0;
          }

          if (newValue >= autoCashout1 || newValue >= autoCashout2) {
            cashOut(newValue);
            return newValue;
          }

          return newValue;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setRocketPosition({ x: 10, y: 80 });
    }
  }, [isPlaying, autoCashout1, autoCashout2]);

  const placeBet = () => {
    const totalBet = betAmount1 + betAmount2;
    if (totalBet > balance) {
      toast.error('Недостаточно средств');
      return;
    }
    setBalance(prev => prev - totalBet);
    setIsWaiting(true);
    setMultiplier(1.0);
  };

  const cashOut = (mult: number) => {
    const winAmount = (betAmount1 + betAmount2) * mult;
    setBalance(prev => prev + winAmount);
    setHistory(prev => [mult, ...prev.slice(0, 3)]);
    toast.success(`Выигрыш: ${winAmount.toFixed(2)}$ (x${mult.toFixed(2)})`);
    resetGame();
  };

  const crashed = (mult: number) => {
    setHistory(prev => [mult, ...prev.slice(0, 3)]);
    toast.error(`Ракета взорвалась на x${mult.toFixed(2)}!`);
    resetGame();
  };

  const resetGame = () => {
    setIsPlaying(false);
    setMultiplier(1.0);
    setIsWaiting(false);
    setWaitProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-3">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white h-10" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white">
              <Icon name="MessageSquare" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Icon name="Users" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Icon name="Settings" size={20} />
            </Button>
            <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold flex items-center gap-2">
              <Icon name="Wallet" size={16} />
              {balance.toLocaleString()} $
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-5xl">
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 border-0 mb-4 rounded-3xl" style={{ height: '420px' }}>
          {isWaiting ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center mb-4 relative">
                <Icon name="Loader2" size={32} className="animate-spin" />
                <div className="absolute -inset-1">
                  <div className="w-full h-full rounded-full border-4 border-transparent border-t-white animate-spin"></div>
                </div>
              </div>
              <p className="text-2xl font-bold mb-2 tracking-wide">ОЖИДАНИЕ</p>
              <p className="text-xl font-semibold opacity-90">СЛЕДУЮЩЕГО РАУНДА</p>
              <div className="w-48 h-1.5 bg-white/20 rounded-full mt-6 overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${waitProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute left-12 top-12 text-yellow-200/80 font-bold text-9xl pointer-events-none animate-pulse" style={{ textShadow: '0 0 40px rgba(255,255,255,0.5)' }}>
                x{multiplier.toFixed(2)}
              </div>
              
              {isPlaying && (
                <div 
                  className="absolute transition-all duration-100 ease-linear"
                  style={{ 
                    left: `${rocketPosition.x}%`, 
                    top: `${rocketPosition.y}%`,
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))'
                  }}
                >
                  <div className="relative">
                    <img 
                      src="https://cdn.poehali.dev/files/9e956773-8292-4daa-bc36-da36dcc795f4.png" 
                      alt="rocket"
                      className="w-32 h-32 object-contain animate-bounce"
                      style={{ animationDuration: '0.5s' }}
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16">
                      <div className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full blur-md opacity-80 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}

              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
            <div className="flex items-center justify-between text-white/80 text-sm">
              <span className="font-medium">Ставок <span className="text-white font-bold">112</span></span>
              <div className="flex gap-2">
                {history.map((h, i) => (
                  <div 
                    key={i}
                    className={`px-3 py-1 rounded-lg font-bold text-xs ${
                      h > 2 ? 'bg-blue-600' : h > 1.5 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}
                  >
                    {h < 2 ? '?' : `${h.toFixed(2)}x`}
                  </div>
                ))}
              </div>
              <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white">
                <Icon name="Clock" size={18} />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map((num) => (
            <Card key={num} className="p-4 bg-[#2A2540] border-[#3D3558] rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${num === 1 ? 'bg-purple-500' : 'bg-pink-500'}`}></div>
                  <span className="text-white/60 text-xs font-semibold">Автоставка</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs">Автовывод</span>
                  <span className="text-white font-bold">x {num === 1 ? autoCashout1.toFixed(2) : autoCashout2.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 bg-[#1A1629] rounded-xl p-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="bg-white/5 hover:bg-white/10 text-white h-12 w-12 rounded-lg"
                    onClick={() => num === 1 ? setBetAmount1(prev => Math.max(0.1, prev - 0.1)) : setBetAmount2(prev => Math.max(0.1, prev - 0.1))}
                    disabled={isPlaying || isWaiting}
                  >
                    <Icon name="Minus" size={18} />
                  </Button>
                  <div className="flex-1 text-center">
                    <Input 
                      type="number" 
                      step="0.1"
                      value={num === 1 ? betAmount1 : betAmount2}
                      onChange={(e) => num === 1 ? setBetAmount1(Number(e.target.value)) : setBetAmount2(Number(e.target.value))}
                      className="bg-transparent border-0 text-white text-center text-2xl font-bold h-12 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled={isPlaying || isWaiting}
                    />
                    <div className="text-white/40 text-xs mt-0.5">S</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="bg-white/5 hover:bg-white/10 text-white h-12 w-12 rounded-lg"
                    onClick={() => num === 1 ? setBetAmount1(prev => prev + 0.1) : setBetAmount2(prev => prev + 0.1)}
                    disabled={isPlaying || isWaiting}
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
                
                <div className="flex gap-1.5 mt-2">
                  {[5, 25, 50, 100].map(amount => (
                    <Button 
                      key={amount}
                      variant="ghost"
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs h-8 rounded-lg"
                      onClick={() => num === 1 ? setBetAmount1(prev => prev + amount) : setBetAmount2(prev => prev + amount)}
                      disabled={isPlaying || isWaiting}
                    >
                      +{amount}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                className={`w-full h-14 text-lg font-bold rounded-xl ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                } text-white`}
                onClick={isPlaying ? () => cashOut(multiplier) : placeBet}
                disabled={isWaiting}
              >
                {isPlaying ? 'СТАВКА' : 'СТАВКА'}
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Game;