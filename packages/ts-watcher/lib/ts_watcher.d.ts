export interface ProgramOptions {
    project: string;
}
export declare function run(options: ProgramOptions, tsArgs: string[]): Promise<void>;
