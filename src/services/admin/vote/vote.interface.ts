export interface IVoteChoice {
  id?: string;
  label: string;
  createdAt?: Date;
}

export interface IVoteAnswer {
  id?: string;
  userId: string;
  vote: IVote;
  voteChoice: IVoteChoice;
  createdAt: Date;
}

export interface IVote {
  id?: string;
  title: string;
  activated: boolean;
  choices: IVoteChoice[];
  answers?: IVoteAnswer[];
  updatedAt?: Date;
  createdAt?: Date;
}
