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

const ShopPage = ({ theme }) => {
  // Временные данные для доната
  const donationItems = [
    { id: 1, title: 'Донат 1', description: 'Описание первого доната' },
    { id: 2, title: 'Донат 2', description: 'Описание второго доната' },
    { id: 3, title: 'Донат 3', description: 'Описание третьего доната' },
  ];

  // Временные данные для подписок
  const subscriptionItems = [
    { id: 1, title: 'Подписка 1', description: 'Описание первой подписки' },
    { id: 2, title: 'Подписка 2', description: 'Описание второй подписки' },
    { id: 3, title: 'Подписка 3', description: 'Описание третьей подписки' },
  ];

  return (
    <Container>
      <SectionTitle>Донат</SectionTitle>
      <CardGrid>
        {donationItems.map(item => (
          <Card key={item.id}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </CardGrid>

      <SectionTitle>Подписки</SectionTitle>
      <CardGrid>
        {subscriptionItems.map(item => (
          <Card key={item.id}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default ShopPage;