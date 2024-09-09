import React from 'react';

const UserNavigator = ({ onNextUser, onPrevUser }) => {
  return (
    <div>
      <button onClick={onPrevUser}>Anterior</button>
      <button onClick={onNextUser}>Próximo</button>
    </div>
  );
};

export default UserNavigator;
