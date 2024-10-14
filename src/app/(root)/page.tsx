"use client"; // Mantenha esta linha no início do arquivo

import React, { useEffect, useState } from 'react';
import { DeleteUserById, UserGetById, UserList, UserRegister } from '../../../services/user';
import { User } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setprofileImage] = useState<File>();
  const [error, setError] = useState<string | null>(null); // Para lidar com erros
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Chamada assíncrona usando fetch
    UserRegister({ name, email, password, profileImage }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return response.json();
    })
      .then((newUser) => {
        console.log('User created:', newUser);
        setSuccess('User created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setprofileImage(undefined);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to create user');
      });
  };

  const [userList, setUserList] = React.useState<User[]>([]);
  const [userId, setUserId] = React.useState<User>();

  useEffect(() => {
    UserList().then(result => setUserList(result.items));
  }, []);

  async function onDelete(user: User) {
    await DeleteUserById(user.id)

    UserList().then(result => setUserList(result.items))
  }

  async function aoisudjhoisa(user: User) {
    setUserId(await UserGetById(user.id))
  }

  const LogoComponent: React.FC = (props) => {
    return (
      <AvatarImage src={props.img} alt="sjdoisj" width={200} height={200} />
    )
  }

  return (
    <>
      {userList.map(user => (
        <div key={user.id} className='flex gap-2'>
          <p>{user.name}</p>
          <Button onClick={() => onDelete(user)}>sdsds</Button>
          {/* <Avatar>
            <LogoComponent img={user.profileImgUrl} />
            <AvatarImage src={user.profileImgUrl} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button onClick={() => aoisudjhoisa(user)}>ClickMe</Button> */}
        </div>
      ))}
      <div>
        <p>{userId?.name}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          placeholder="image"
          onChange={(e) => setprofileImage(e.currentTarget.files?.[0])}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Create User
        </button>
      </form>
    </>
  );
};

export default CreateUserForm;