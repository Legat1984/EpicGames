import React from 'react';
import styled from 'styled-components';

const GameSettingsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const GameTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${props => props.theme.text};
  font-size: 1.8rem;
`;

const GameDescription = styled.p`
  color: ${props => props.theme.text};
  line-height: 1.6;
  margin: 0 0 2rem 0;
`;

const GameSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
`;

const SectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: ${props => props.theme.text};
  font-size: 1.4rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
`;

const TableHeader = styled.th`
  background: ${props => props.theme.card};
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid ${props => props.theme.border};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${props => props.theme.card};
  }
  &:hover {
    background: ${props => props.theme.button};
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const Button = styled.button`
  background: ${props => props.theme.button};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

const GameSettingsContent = ({ game, theme }) => {
  // Хардкодированные данные для таблиц
  const currentGames = [
    { id: 1, title: "Тетрис", players: "4/4", status: "Идет игра", time: "15:30" },
    { id: 2, title: "Шахматы", players: "1/2", status: "Ожидание", time: "16:00" },
    { id: 3, title: "Монополия", players: "3/4", status: "Идет игра", time: "17:15" }
  ];

  const invitations = [
    { id: 1, game: "Шахматы", from: "Иван Петров", time: "10:30", status: "Новое" },
    { id: 2, game: "Тетрис", from: "Мария Сидорова", time: "11:00", status: "Новое" },
    { id: 3, game: "Мафия", from: "Алексей Козлов", time: "12:15", status: "Просрочено" }
  ];

  const activeGames = [
    { id: 1, title: "Шахматы", players: "2/2", status: "Активна", time: "16:00", type: "Личная встреча" },
    { id: 2, title: "Тетрис", players: "4/4", status: "Идет игра", time: "15:30", type: "Онлайн" },
    { id: 3, title: "Каркассон", players: "3/5", status: "Ожидание", time: "18:00", type: "Онлайн" }
  ];

  return (
    <GameSettingsContainer>
      <Button theme={theme} onClick={() => console.log('Создать игру')}>
        Создать игру
      </Button>
      
      <GameTitle theme={theme}>{game ? game.title : "Настройки игр"}</GameTitle>
      <GameDescription theme={theme}>
        {game ? game.description : "Управление вашими играми, приглашениями и активными сессиями"}
      </GameDescription>

      <GameSections>
        <Section theme={theme}>
          <SectionTitle theme={theme}>Список текущих игр</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Название игры</TableHeader>
                <TableHeader>Игроки</TableHeader>
                <TableHeader>Статус</TableHeader>
                <TableHeader>Время</TableHeader>
              </tr>
            </thead>
            <tbody>
              {currentGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.title}</TableCell>
                  <TableCell>{game.players}</TableCell>
                  <TableCell>{game.status}</TableCell>
                  <TableCell>{game.time}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Section>

        <Section theme={theme}>
          <SectionTitle theme={theme}>Список приглашений</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Игра</TableHeader>
                <TableHeader>От кого</TableHeader>
                <TableHeader>Время</TableHeader>
                <TableHeader>Статус</TableHeader>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell>{invitation.game}</TableCell>
                  <TableCell>{invitation.from}</TableCell>
                  <TableCell>{invitation.time}</TableCell>
                  <TableCell>{invitation.status}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Section>

        <Section theme={theme}>
          <SectionTitle theme={theme}>Список активных игр</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHeader>Название игры</TableHeader>
                <TableHeader>Игроки</TableHeader>
                <TableHeader>Статус</TableHeader>
                <TableHeader>Время</TableHeader>
                <TableHeader>Тип</TableHeader>
              </tr>
            </thead>
            <tbody>
              {activeGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.title}</TableCell>
                  <TableCell>{game.players}</TableCell>
                  <TableCell>{game.status}</TableCell>
                  <TableCell>{game.time}</TableCell>
                  <TableCell>{game.type}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Section>
      </GameSections>
    </GameSettingsContainer>
  );
};

export default GameSettingsContent;