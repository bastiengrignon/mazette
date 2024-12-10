import React, { useEffect, useState } from 'react';
import DashboardText from '../../DashboardText';
import { IText, TextService } from '../../../../services';

const DashboardPageHome: React.FC = () => {
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const [texts, setTexts] = useState<IText[]>([]);
  const [newTexts, setNewTexts] = useState<IText[]>(texts);

  useEffect(() => {
    setIsTextLoading(true);
    TextService.getAll()
      .then(setTexts)
      .finally(() => setIsTextLoading(false));
  }, [newTexts]);

  return (
    <div>
      <DashboardText isLoading={isTextLoading} texts={texts} setTexts={setTexts} setNewTexts={setNewTexts}/>
    </div>
  );
};

export default DashboardPageHome;
