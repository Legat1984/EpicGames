import React, { useState } from 'react';
import styled from 'styled-components';
import { Gamepad2, MessageCircle, X, Send, Users, Plus, User } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(31, 41, 55, 0.5);
  padding: 1rem;
  position: relative;
  z-index: 10;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GameIcon = styled(Gamepad2)`
  color: white;
  width: 32px;
  height: 32px;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  color: white;
  font-size: 0.875rem;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled.div`
  background: rgba(31, 41, 55, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background: rgba(31, 41, 55, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const GameImage = styled.div`
  width: 100%;
  height: 128px;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const GameName = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const GamePlayers = styled.p`
  color: #94a3b8;
  margin-bottom: 1rem;
`;

const GameButton = styled.button`
  width: 100%;
  background: #6366f1;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #4f46e5;
  }
`;

const GameOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const OptionCard = styled.div`
  background: rgba(31, 41, 55, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const OptionIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#818cf8'};
  font-size: 1.5rem;
  background: rgba(75, 85, 99, 0.2);
  border-radius: 50%;
`;

const OptionTitle = styled.h2`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const OptionSubtitle = styled.p`
  color: #94a3b8;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #cbd5e1;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const OptionButton = styled.button`
  width: 100%;
  background: ${props => props.variant === 'success' ? '#10b981' : '#6366f1'};
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'success' ? '#059669' : '#4f46e5'};
  }
`;

const Separator = styled.div`
  border-top: 1px solid rgba(75, 85, 99, 0.3);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

const TablesTitle = styled.h3`
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TableItem = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const TableName = styled.span`
  color: white;
  font-weight: 500;
`;

const TableStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: white;
  background: ${props => props.status === 'В процессе' ? '#ef4444' : '#10b981'};
`;

const TableInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const PlayersIcon = styled(Users)`
  width: 16px;
  height: 16px;
  color: #94a3b8;
`;

const PlayersCount = styled.span`
  color: #94a3b8;
  font-size: 0.875rem;
`;

const JoinButton = styled.button`
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2563eb;
  }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #6366f1;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: background 0.3s ease;
  z-index: 50;

  &:hover {
    background: #4f46e5;
  }
`;

const ChatModal = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 1.5rem;
  width: 20rem;
  height: 24rem;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 50;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
`;

const ChatTitle = styled.h3`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Message = styled.div`
  background: rgba(31, 41, 55, 0.6);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const MessageUser = styled.span`
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
`;

const MessageTime = styled.span`
  color: #94a3b8;
  font-size: 0.75rem;
`;

const MessageText = styled.p`
  color: #e2e8f0;
  font-size: 0.875rem;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid rgba(75, 85, 99, 0.3);
`;

const MessageInput = styled.input`
  flex: 1;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: white;
  font-size: 0.875rem;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

const SendButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #4f46e5;
  }
`;

const BackButton = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background 0.3s ease;
  margin-right: 1rem;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
  }
`;

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'Алексей', text: 'Привет всем!', time: '12:30' },
    { id: 2, user: 'Мария', text: 'Готовы играть?', time: '12:31' },
    { id: 3, user: 'Иван', text: 'Да, создавайте стол', time: '12:32' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeView, setActiveView] = useState('game-select');
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { id: 1, name: 'Шахматы', players: 2, image: 'https://placehold.co/300x200/4f46e5/ffffff?text=Шахматы' },
    { id: 2, name: 'Шашки', players: 2, image: 'https://placehold.co/300x200/059669/ffffff?text=Шашки' },
    { id: 3, name: 'Монополия', players: 4, image: 'https://placehold.co/300x200/dc2626/ffffff?text=Монополия' },
    { id: 4, name: 'Каркассон', players: 5, image: 'https://placehold.co/300x200/7c3aed/ffffff?text=Каркассон' },
    { id: 5, name: 'Колонизаторы', players: 4, image: 'https://placehold.co/300x200/ea580c/ffffff?text=Колонизаторы' },
    { id: 6, name: 'Дурак', players: 2, image: 'https://placehold.co/300x200/16a34a/ffffff?text=Дурак' }
  ];

  const gameTables = [
    { id: 1, game: 'Шахматы', players: ['Алексей', 'Мария'], status: 'В процессе', maxPlayers: 2 },
    { id: 2, game: 'Шашки', players: ['Иван'], status: 'Ожидание', maxPlayers: 2 },
    { id: 3, game: 'Монополия', players: ['Ольга', 'Петр', 'Сергей'], status: 'Ожидание', maxPlayers: 4 }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'Вы',
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderGameSelect = () => (
    <Container>
      <Header>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <GameIcon />
            <Title>Игровая Платформа</Title>
          </div>
          <UserSection>
            <User size={20} color="white" />
            <UserName>Игрок</UserName>
          </UserSection>
        </HeaderContent>
      </Header>

      <Main>
        <SectionTitle>Выберите игру</SectionTitle>
        <GameGrid>
          {games.map((game) => (
            <GameCard key={game.id} onClick={() => {
              setSelectedGame(game);
              setActiveView('game-options');
            }}>
              <GameImage src={game.image} />
              <GameName>{game.name}</GameName>
              <GamePlayers>Игроков: {game.players}</GamePlayers>
              <GameButton>Играть</GameButton>
            </GameCard>
          ))}
        </GameGrid>
      </Main>

      <ChatButton onClick={() => setIsChatOpen(true)}>
        <MessageCircle size={24} />
      </ChatButton>

      {isChatOpen && (
        <ChatModal>
          <ChatHeader>
            <ChatTitle>Чат</ChatTitle>
            <CloseButton onClick={() => setIsChatOpen(false)}>
              <X size={20} />
            </CloseButton>
          </ChatHeader>
          <ChatMessages>
            {messages.map((message) => (
              <Message key={message.id}>
                <MessageHeader>
                  <MessageUser>{message.user}</MessageUser>
                  <MessageTime>{message.time}</MessageTime>
                </MessageHeader>
                <MessageText>{message.text}</MessageText>
              </Message>
            ))}
          </ChatMessages>
          <ChatInput>
            <MessageInput
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Введите сообщение..."
            />
            <SendButton onClick={handleSendMessage}>
              <Send size={16} />
            </SendButton>
          </ChatInput>
        </ChatModal>
      )}
    </Container>
  );

  const renderGameOptions = () => (
    <Container>
      <Header>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BackButton onClick={() => setActiveView('game-select')}>
              ← Назад
            </BackButton>
            <GameIcon />
            <Title>{selectedGame?.name}</Title>
          </div>
          <UserSection>
            <User size={20} color="white" />
            <UserName>Игрок</UserName>
          </UserSection>
        </HeaderContent>
      </Header>

      <Main>
        <GameOptionsGrid>
          {/* Create Game */}
          <OptionCard>
            <OptionIcon color="#818cf8">
              <Plus size={24} />
            </OptionIcon>
            <OptionTitle>Создать стол</OptionTitle>
            <OptionSubtitle>Создайте новый игровой стол и пригласите друзей</OptionSubtitle>
            <InputGroup>
              <Label>Название стола</Label>
              <Input type="text" placeholder="Введите название стола" />
            </InputGroup>
            <InputGroup>
              <Label>Пароль (опционально)</Label>
              <Input type="password" placeholder="Введите пароль" />
            </InputGroup>
            <OptionButton>Создать стол</OptionButton>
          </OptionCard>

          {/* Join Game */}
          <OptionCard>
            <OptionIcon color="#10b981">
              <Users size={24} />
            </OptionIcon>
            <OptionTitle>Присоединиться</OptionTitle>
            <OptionSubtitle>Присоединитесь к существующему столу</OptionSubtitle>
            <InputGroup>
              <Label>Код приглашения</Label>
              <Input type="text" placeholder="Введите код приглашения" />
            </InputGroup>
            <OptionButton variant="success">Присоединиться по коду</OptionButton>
            
            <Separator>
              <TablesTitle>Доступные столы</TablesTitle>
              <TableList>
                {gameTables.filter(table => table.game === selectedGame?.name).map((table) => (
                  <TableItem key={table.id}>
                    <TableHeader>
                      <TableName>Стол #{table.id}</TableName>
                      <TableStatus status={table.status}>{table.status}</TableStatus>
                    </TableHeader>
                    <TableInfo>
                      <PlayersIcon />
                      <PlayersCount>
                        {table.players.length}/{table.maxPlayers} игроков
                      </PlayersCount>
                    </TableInfo>
                    <JoinButton>Присоединиться</JoinButton>
                  </TableItem>
                ))}
              </TableList>
            </Separator>
          </OptionCard>
        </GameOptionsGrid>
      </Main>

      <ChatButton onClick={() => setIsChatOpen(true)}>
        <MessageCircle size={24} />
      </ChatButton>

      {isChatOpen && (
        <ChatModal>
          <ChatHeader>
            <ChatTitle>Чат</ChatTitle>
            <CloseButton onClick={() => setIsChatOpen(false)}>
              <X size={20} />
            </CloseButton>
          </ChatHeader>
          <ChatMessages>
            {messages.map((message) => (
              <Message key={message.id}>
                <MessageHeader>
                  <MessageUser>{message.user}</MessageUser>
                  <MessageTime>{message.time}</MessageTime>
                </MessageHeader>
                <MessageText>{message.text}</MessageText>
              </Message>
            ))}
          </ChatMessages>
          <ChatInput>
            <MessageInput
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Введите сообщение..."
            />
            <SendButton onClick={handleSendMessage}>
              <Send size={16} />
            </SendButton>
          </ChatInput>
        </ChatModal>
      )}
    </Container>
  );

  return activeView === 'game-select' ? renderGameSelect() : renderGameOptions();
};

export default App;
