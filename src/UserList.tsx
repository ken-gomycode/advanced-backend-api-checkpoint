// src/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Define user type
interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const UserList: React.FC = () => {
  const [listOfUser, setListOfUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
      setListOfUser(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const userCards = listOfUser.map((user) => (
    <Card key={user.id}>
      <Name>{user.name}</Name>
      <Info>Email: {user.email}</Info>
      <Info>Company: {user.company.name}</Info>
    </Card>
  ))

  useEffect(() => {
    // Run the fetchUser function when the component is mounted
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <LoaderWrapper>
        ...Loading Data
      </LoaderWrapper>
    )
  }

  return (
    <Container>
      <Title>User List</Title>
      {userCards}
    </Container>
  );
};

export default UserList;

// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const Name = styled.h3`
  margin: 0;
`;

const Info = styled.p`
  margin: 5px 0;
`;

const LoaderWrapper = styled.div`
    height: 50vh;
    display: grid;
    place-items: center;s
`;