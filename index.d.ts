// Type definitions for resource-loader
// Project: https://github.com/englercj/resource-loader
// Definitions by: Ivan Juarez N. https://github.com/radixzz
// Definitions: https://github.com/radixzz/resource-loader-ts-definitions


declare interface IOptions {
    crossOrigin?: boolean;
    loadType?: number;
    xhrType?: string;
    metadata?: {
        loadElement: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
        skipSource: boolean;
    };
}

declare class Resource {

    static STATUS_FLAGS: {
        NONE: number;
        DATA_URL: number;   
        COMPLETE: number;   
        LOADING: number;    
    }

    static LOAD_TYPE: {
        /** Uses XMLHttpRequest to load the resource. */
        XHR: number;
        /** Uses an `Image` object to load the resource. */
        IMAGE: number;
        /** Uses an `Audio` object to load the resource. */
        AUDIO: number;
        /** Uses a `Video` object to load the resource. */
        VIDEO: number;
    }

    static TYPE: {
        UNKNOWN: number,
        JSON: number,
        XML: number,
        IMAGE: number,
        AUDIO: number,
        VIDEO: number,
        TEXT: number,
    }

    static XHR_RESPONSE_TYPE:  {
        /** string */
        DEFAULT: string;
        /** ArrayBuffer */
        BUFFER: string;
        /** Blob */
        BLOB: string;
        /** Document */
        DOCUMENT: string;
        /** Object */
        JSON: string;
        /** String */
        TEXT: string;
    }

    static EMPTY_GIF: string;

    public readonly isLoading: boolean;
    public readonly isComplete: boolean;
    public readonly isDataUrl: boolean;
    public name: string;
    public url: string;
    public extension: string;
    public data: any;
    public crossOrigin: boolean;
    public loadType: number;
    public xhrType: string;
    public metadata: {
        loadElement: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
        skipSource: boolean;
    }
    public error: Error;
    public xhr: XMLHttpRequest;
    public children: Resource[];



    constructor(name: string, url: string | string[], options: IOptions );
        /** Kicks off loading of this resource. This method is asynchronous. */
    load( callback: ()=> void ): void;

    /** Aborts the loading of this resource, with an optional message. */
    abort( message: string ): void;

    /** Marks the resource as complete. */
    complete(): void;

}

declare class SignalBinding {
    constructor( fn: ()=> void, once:boolean, context?: any );
    public detach(): boolean;
}

declare class Signal {

    /** Return an array of attached SignalBinding.*/
    public handlers( exists?: boolean ): boolean | SignalBinding[];

    /** Return true if node is a MiniSignalBinding attached to this MiniSignal */
    public has( node: SignalBinding ): boolean;

    /** Dispaches a signal to all registered listeners. */
    public dispatch(): boolean;

    /** Register a new listener. */
    public add( fn: ()=> void, context?: any ): SignalBinding;

    /** Register a new listener that will be executed only once. */
    public once( fn: ()=> void, context?: any ): SignalBinding;

    /** Remove binding object. */
    public detach( node: SignalBinding ): Signal;

    /** Detach all listeners. */
    public detachAll(): Signal;

}

declare class LoaderStatic {

    constructor( baseUrl?: string, concurrency?: number );

    /** The base url for all resources loaded by this loader. */
    baseUrl: string;

    /** The progress percent of the loader going through the queue. */
    progress: number;

    /** Loading state of the loader, true if it is currently loading resources. */
    loading: boolean;

    /** A querystring to append to every URL added to the loader. */
    defaultQueryString : string;

    /** All the resources for this loader keyed by name. */
    resources: {};

    /** Dispatched once per errored resource. */
    onProgress: Signal;

    /** Dispatched once per errored resource. */
    onError: Signal;

    /** Dispatched once per loaded resource. */
    onLoad: Signal;

    /** Dispatched when the loader begins to process the queue. */
    onStart: Signal;

        /**  Dispatched when the queued resources all load. */
    onComplete: Signal;

    /** Adds a resource (or multiple resources) to the loader queue.*/
    public add(name: string | string[], url: string, callback: ()=> void ): LoaderStatic;
    public add(name: string | string[], url: string, options: IOptions, callback: ()=> void ): LoaderStatic;

    /** Sets up a middleware function that will run *before* the resource is loaded. */
    public pre( fn: () => void ): LoaderStatic;

    /** Sets up a middleware function that will run *after* the resource is loaded. */
    public use( fn: ()=> void ): LoaderStatic;

    /** Resets the queue of the loader to prepare for a new load. */
    public reset(): LoaderStatic;

    /** Starts loading the queued resources. */
    public load( cb?: () => void ): LoaderStatic;
}

declare var Loader: LoaderStatic;
declare module "resource-loader" {
    export default Loader;
}