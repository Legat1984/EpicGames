import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.text};
  margin-bottom: 20px;
  font-size: 24px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid ${props => props.theme.border};
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
`;

const HomePage = ({ theme }) => {
  // Временные данные для новостей
  const newsItems = [
    { id: 1, title: 'Новость 1', description: 'Описание первой новости' },
    { id: 2, title: 'Новость 2', description: 'Описание второй новости' },
    { id: 3, title: 'Новость 3', description: 'Описание третьей новости' },
  ];

  // Временные данные для рекомендуемых
  const recommendedItems = [
    { id: 1, title: 'Рекомендуемая игра 1', description: 'Описание рекомендуемой игры' },
    { id: 2, title: 'Рекомендуемая игра 2', description: 'Описание второй рекомендуемой игры' },
    { id: 3, title: 'Рекомендуемая игра 3', description: 'Описание третьей рекомендуемой игры' },
  ];

  return (
    <Container>
      <SectionTitle>Новости</SectionTitle>
      <CardGrid>
        {newsItems.map(item => (
          <Card key={item.id}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </CardGrid>

      <SectionTitle>Рекомендуем</SectionTitle>
      <CardGrid>
        {recommendedItems.map(item => (
          <Card key={item.id}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default HomePage;