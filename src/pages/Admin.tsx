import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  
  const [users] = useState([
    { id: 1, name: 'Александр', email: 'alex@example.com', balance: 1500, bonusBalance: 500, status: 'active' },
    { id: 2, name: 'Мария', email: 'maria@example.com', balance: 2300, bonusBalance: 200, status: 'active' },
    { id: 3, name: 'Дмитрий', email: 'dmitry@example.com', balance: 800, bonusBalance: 0, status: 'blocked' },
  ]);

  const [transactions] = useState([
    { id: 1, user: 'Александр', type: 'deposit', amount: 1000, date: '30.10.2025', status: 'completed' },
    { id: 2, user: 'Мария', type: 'withdraw', amount: 500, date: '30.10.2025', status: 'pending' },
    { id: 3, user: 'Дмитрий', type: 'bonus', amount: 200, date: '29.10.2025', status: 'completed' },
  ]);

  const [orders] = useState([
    { id: 1, user: 'Александр', service: 'Telegram подписчики', count: 500, price: 250, status: 'processing' },
    { id: 2, user: 'Мария', service: 'TikTok лайки', count: 1000, price: 200, status: 'completed' },
  ]);

  const handleBlockUser = (userId: number) => {
    toast.success('Пользователь заблокирован');
  };

  const handleApproveTransaction = (transactionId: number) => {
    toast.success('Транзакция одобрена');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-xl font-bold text-white">Панель управления</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] border-0 text-white">
            <Icon name="Users" size={32} className="mb-2" />
            <div className="text-3xl font-bold">{users.length}</div>
            <div className="text-sm opacity-90">Всего пользователей</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#F97316] to-[#EA384C] border-0 text-white">
            <Icon name="DollarSign" size={32} className="mb-2" />
            <div className="text-3xl font-bold">{transactions.length}</div>
            <div className="text-sm opacity-90">Транзакций</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#0EA5E9] to-[#8B5CF6] border-0 text-white">
            <Icon name="ShoppingCart" size={32} className="mb-2" />
            <div className="text-3xl font-bold">{orders.length}</div>
            <div className="text-sm opacity-90">Заказов накрутки</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#10B981] to-[#059669] border-0 text-white">
            <Icon name="TrendingUp" size={32} className="mb-2" />
            <div className="text-3xl font-bold">
              {transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}₽
            </div>
            <div className="text-sm opacity-90">Оборот</div>
          </Card>
        </div>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/10">
              <TabsTrigger value="users" className="data-[state=active]:bg-[#8B5CF6]">
                <Icon name="Users" size={18} className="mr-2" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-[#8B5CF6]">
                <Icon name="DollarSign" size={18} className="mr-2" />
                Транзакции
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-[#8B5CF6]">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Заказы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white">ID</TableHead>
                      <TableHead className="text-white">Имя</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Баланс</TableHead>
                      <TableHead className="text-white">Бонусы</TableHead>
                      <TableHead className="text-white">Статус</TableHead>
                      <TableHead className="text-white">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{user.id}</TableCell>
                        <TableCell className="text-white font-medium">{user.name}</TableCell>
                        <TableCell className="text-white/70">{user.email}</TableCell>
                        <TableCell className="text-white">{user.balance}₽</TableCell>
                        <TableCell className="text-white">{user.bonusBalance}₽</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                              onClick={() => handleBlockUser(user.id)}
                            >
                              <Icon name="Ban" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white">ID</TableHead>
                      <TableHead className="text-white">Пользователь</TableHead>
                      <TableHead className="text-white">Тип</TableHead>
                      <TableHead className="text-white">Сумма</TableHead>
                      <TableHead className="text-white">Дата</TableHead>
                      <TableHead className="text-white">Статус</TableHead>
                      <TableHead className="text-white">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{tx.id}</TableCell>
                        <TableCell className="text-white font-medium">{tx.user}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            tx.type === 'deposit' 
                              ? 'bg-green-500/20 text-green-400' 
                              : tx.type === 'withdraw'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {tx.type === 'deposit' ? 'Пополнение' : tx.type === 'withdraw' ? 'Вывод' : 'Бонус'}
                          </span>
                        </TableCell>
                        <TableCell className="text-white font-bold">{tx.amount}₽</TableCell>
                        <TableCell className="text-white/70">{tx.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            tx.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {tx.status === 'completed' ? 'Завершено' : 'Ожидание'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {tx.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApproveTransaction(tx.id)}
                            >
                              <Icon name="Check" size={14} className="mr-1" />
                              Одобрить
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white">ID</TableHead>
                      <TableHead className="text-white">Пользователь</TableHead>
                      <TableHead className="text-white">Услуга</TableHead>
                      <TableHead className="text-white">Количество</TableHead>
                      <TableHead className="text-white">Цена</TableHead>
                      <TableHead className="text-white">Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{order.id}</TableCell>
                        <TableCell className="text-white font-medium">{order.user}</TableCell>
                        <TableCell className="text-white">{order.service}</TableCell>
                        <TableCell className="text-white">{order.count}</TableCell>
                        <TableCell className="text-white font-bold">{order.price}₽</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status === 'completed' ? 'Выполнено' : 'В процессе'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
