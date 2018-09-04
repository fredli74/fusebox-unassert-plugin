import * as esprima from "esprima";
import * as escodegen from "escodegen";
import * as estraverse from "estraverse";
import * as unassert from "unassert";

export interface UnassertPluginOptions {
	// Not used, options are just passed into unassert as it is
	// could implement individual options for escodegen, unassert, esprima
	// for better output control
};

const escodegenOptions = {
	format: {
		indent: {
			style: "\t",
		},
		quotes: "auto",
	},
	comment: true
};

export class UnassertPluginClass {
	public test: RegExp = /\.(j|t)s(x)?$/;
	public options: any;
    public dependencies: string[] = [ "unassert" ];

	constructor(options: any) {
		this.options = options || {}
	}

	public transform(file:any, ast?: any): any {
		// Make sure ast is done and loaded
		if (!file.analysis.ast) {
			file.loadContents();
			file.analysis.parseUsingAcorn();
			file.analysis.analyze();
		}

		/**
		
		// simple method without comments 
		ast = unassert(file.analysis.ast);
 		file.contents = file.context.generateCode(modifiedAST, escodegenOptions);
		return;
		
		**/

		ast = esprima.parse(file.contents, {
		    range: true,
		    tokens: true,
		    comment: true
		 });

		let attachedAst = escodegen.attachComments(ast, ast.comments, ast.tokens);
		let modifiedAst = estraverse.replace(attachedAst, unassert.createVisitor(this.options));

		file.contents = escodegen.generate(modifiedAst, escodegenOptions);
	}

	// public init(context: WorkFlowContext):any {}
    // public transformGroup(file: File): any {}
    // public onTypescriptTransform(file: File): any {}
    // public bundleStart(context: WorkFlowContext): any {}
    // public bundleEnd(context: WorkFlowContext): any {}
    // public producerEnd(producer: BundleProducer): any {}
    // public onSparky(): any {}
}

export const UnassertPlugin = (options: UnassertPluginOptions) => {
	return new UnassertPluginClass(options || {});
}