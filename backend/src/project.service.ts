import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  private readonly PROJECT_ID = 'project-1';

  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  private loadSeed(): any {
    // Reuse existing seed file from the old Express api
    const seedPath = join(
      __dirname,
      '..',
      '..',
      'api',
      'seed',
      'project.json',
    );
    const raw = readFileSync(seedPath, 'utf8');
    return JSON.parse(raw);
  }

  private ensureHotspots(project: any): any {
    if (
      project.buildings &&
      project.buildings[0] &&
      !project.buildings[0].hotspots
    ) {
      project.buildings[0].hotspots = [];
    }
    return project;
  }

  async loadProject(): Promise<any> {
    let row = await this.projectRepo.findOne({
      where: { id: this.PROJECT_ID },
    });

    if (!row) {
      const seed = this.ensureHotspots(this.loadSeed());
      row = this.projectRepo.create({
        id: this.PROJECT_ID,
        data: seed,
      });
      await this.projectRepo.save(row);
      return seed;
    }

    return this.ensureHotspots(row.data);
  }

  async saveProject(project: any): Promise<void> {
    await this.projectRepo.save({
      id: this.PROJECT_ID,
      data: project,
    });
  }

  async resetProject(): Promise<any> {
    const seed = this.ensureHotspots(this.loadSeed());
    await this.saveProject(seed);
    return seed;
  }

  private findUnit(project: any, unitId: string): { unit: any; floor: any } {
    for (const building of project.buildings) {
      for (const floor of building.floors) {
        const unit = floor.units.find((u: any) => u.id === unitId);
        if (unit) return { unit, floor };
      }
    }
    return { unit: null, floor: null };
  }

  private findFloor(project: any, floorId: string): any | null {
    for (const building of project.buildings) {
      const floor = building.floors.find((f: any) => f.id === floorId);
      if (floor) return floor;
    }
    return null;
  }

  private updateFloorStatus(floor: any) {
    floor.status = floor.units.every((u: any) => u.status === 'sold')
      ? 'sold'
      : 'available';
  }

  async updateUnit(unitId: string, changes: any): Promise<any> {
    const project = await this.loadProject();
    const { unit, floor } = this.findUnit(project, unitId);
    if (!unit || !floor) {
      return null;
    }

    Object.assign(unit, changes);
    this.updateFloorStatus(floor);
    await this.saveProject(project);
    return unit;
  }

  async updateUnitStatus(unitId: string, status: 'sold' | 'available') {
    const project = await this.loadProject();
    const { unit, floor } = this.findUnit(project, unitId);
    if (!unit || !floor) return null;

    unit.status = status;
    this.updateFloorStatus(floor);
    await this.saveProject(project);
    return unit;
  }

  async updateFloorStatusBulk(
    floorId: string,
    status: 'sold' | 'available',
  ): Promise<any | null> {
    const project = await this.loadProject();
    const floor = this.findFloor(project, floorId);
    if (!floor) return null;

    floor.units = floor.units.map((u: any) => ({ ...u, status }));
    this.updateFloorStatus(floor);
    await this.saveProject(project);
    return floor;
  }

  async getHotspots(): Promise<any[]> {
    const project = await this.loadProject();
    return project.buildings?.[0]?.hotspots || [];
  }

  async saveHotspots(hotspots: any[]): Promise<any[]> {
    const project = await this.loadProject();
    if (!project.buildings || project.buildings.length === 0) {
      throw new Error('No buildings found');
    }
    project.buildings[0].hotspots = hotspots;
    await this.saveProject(project);
    return hotspots;
  }
}


