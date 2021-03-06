import {async, TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {AppModule} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {AppConfig} from '../../config/app.config';

describe('HeroService', () => {
  let heroService;
  let newHeroCreated;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        HeroService
      ]
    });

    heroService = TestBed.get(HeroService);
  });

  it('should contains heroes', async(() => {
    heroService.get().subscribe((data: any) => {
      expect(data.length).toBeGreaterThan(AppConfig.topHeroesLimit);
    });
  }));

  it('should get hero by id 1', async(() => {
    heroService.getById('1').subscribe((hero) => {
      expect(hero.id).toEqual(1);
    });
  }));

  it('should fail getting hero by no id', async(() => {
    heroService.getById('noId').subscribe(() => {
    }, (error) => {
      expect(error).toEqual(jasmine.any(TypeError));
    });
  }));

  it('should create hero', async(() => {
    heroService.create({
      'name': 'test',
      'alterEgo': 'test'
    }).subscribe((hero) => {
      newHeroCreated = hero;
      expect(hero.id).not.toBeNull();
    });
  }));

  it('should not like a hero because no votes', async(() => {
    localStorage.setItem('votes', String(AppConfig.votesLimit));
    expect(heroService.checkIfUserCanVote()).toBe(false);
    heroService.like(newHeroCreated).subscribe(() => {
    }, (error) => {
      expect(error).toBe('maximum votes');
    });
  }));

  it('should like a hero', async(() => {
    localStorage.setItem('votes', String(0));
    expect(heroService.checkIfUserCanVote()).toBe(true);
    heroService.like(newHeroCreated).subscribe((response) => {
      expect(response.status).toBe(200);
    });
  }));

  it('should delete a hero', async(() => {
    heroService.remove(newHeroCreated.id).subscribe((response) => {
      expect(response.status).toBe(200);
    });
  }));
});
