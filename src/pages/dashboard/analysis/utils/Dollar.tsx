import { formatDollar } from '@/utils/format';

const Dollar: React.FC<{ children: string | number }> = ({ children }) => {
  return <span>{formatDollar(children)}</span>;
};

export default Dollar;
