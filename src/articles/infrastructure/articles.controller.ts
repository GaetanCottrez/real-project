import { Controller, Get, HttpException, HttpStatus, Inject, Param, UseFilters, UseGuards } from '@nestjs/common';
import { DomainExceptionFilter } from 'src/shared/infrastructure/filters/error.filter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/infrastructure/guard/jwt-auth.guard';
import { Abilities } from 'src/authentication/infrastructure/guard/abilities.decorator';
import { ArticlesService } from '../application/articles.service';
import { ArticleDto } from '../domain/data-transfer-objects/article-dto';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
@UseFilters(new DomainExceptionFilter())
export class ArticlesController {
  constructor(
    @Inject('ArticlesService')
    private readonly articlesService: ArticlesService,
  ) {}

  @Get('')
  @ApiResponse({ status: 200, description: 'Get articles' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Articles:read')
  async getArticles(): Promise<ArticleDto[]> {
    try {
      const articles = await this.articlesService.getArticles();

      const articlesDto = [];
      for (const article of articles) {
        articlesDto.push(this.articlesService.articleView(article));
      }

      return articlesDto;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one article' })
  @ApiResponse({ status: 400, description: 'Article not found' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Articles:read')
  async findOne(@Param('id') id: string): Promise<ArticleDto> {
    try {
      const articleInstance = await this.articlesService.getArticleById(id);
      return this.articlesService.articleView(articleInstance);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
