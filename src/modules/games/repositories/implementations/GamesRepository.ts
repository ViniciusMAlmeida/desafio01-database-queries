import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
      .where("games.title ilike :title", { title: `%${param}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT count(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const usersRepository = getRepository(User);
    return usersRepository
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.games", "games")
      .where("games.id = :id", { id })
      .getMany();
    // .select()
    // .innerJoin("users.id", "users_games_games.usersId")
    // .innerJoin("games.id", "users_games_games.gamesId")
    // .where("games.id = :id", { id })
    // .getMany();
    // Complete usando query builder
  }
}
