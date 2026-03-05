# Review 1
## 1 Justification for importance / relevance
Gaze estimation is an important task in computer vision. This paper introduces temporal information to improve video gaze estimation accuracy, which is relevant to the scope of ICME.

## 2 Justification for novelty / originality
The proposed TDModule is designed for video-based gaze estimation. It leverages grouped convolutions with a recurrent design to integrate static image features and dynamic temporal information. The Transformer further aggregate temporal cues. In addition, the proposed PDA Loss focuses on aligning gaze trajectories, which is new in prior gaze estimation methods.

## 3 Justification for technical correctness
This work clearly defines each component of the proposed RTDNet through math formulations, and the technical description is relatively complete.
- The use of padding and sliding windows in the TDModule is logically reasonable.
- The motivation behind PDA Loss is clear. Combining Euclidean distance terms and angular constraints can avoid trajectory drift.
However, the paper still has some technical limitations.
- No ablation study is conducted on the upsampling and fusion strategies within the TDModule, making it unclear whether they are necessary.
- The paper does not report model size or FLOPs, which limits the evaluation of computational efficiency.

## 4 Justification for experimental validation and reproducibility 
- Overall the proposed method achieves strong performance on two public datasets and is compared with common baselines. The issues related to fairness are also explicitly discussed.
- The additional use of Procrustes distance to evaluate sequence similarity further validates the effectiveness of PDA Loss. It serves as a valuable complement to frame-wise angular metrics.
- Ablation studies are conducted, mainly focusing on the recurrent architecture and PDA Loss. Additional ablations on Transformer-related parameters and TDModule parameters would help better understand the contribution of each component to overall performance.

## 5 Justification for clarity of presentation 
The paper is easy to read. The problem definition of video gaze estimation is clear, and the figures illustrating the model architecture and PDA Loss are well aligned with the text.

## 6 Justification for references 
The references are adequate.

## 7 Justification for overall evaluation
The proposed RTDNet explicitly extracts motion information via TDModule, fuses motion features across scales through recurrent architecture, and emphasizes trajectory alignment at loss level, forming a coherent pipeline. While the contribution is incremental, the experiment results are strong, and the paper is clearly organized. It makes a meaningful contribution to temporal modeling in gaze estimation area.
There remains aspects that could be improved. As mentioned above, additional ablation studies on the upsampling and fusion strategies would better justify the effectiveness of the architecture. Reporting metrics such as parameter size and FLOPs would also strengthen the peper's validation and potential impact.

# Review 2
## 1 Justification for importance / relevance
Video gaze estimation is a key component of video analysis and is relevant to ICME.

## 2 Justification for novelty / originality
The paper presents multiple noteworthy contributions. The TDModule leverages inter-frame differences to extract motion features, while the recurrent fusion design integrates motion features across multiple levels. The PDA Loss is novel, using distance and parallelism to align gaze trajectories. Integrating these components into a unified framework for gaze estimation is original and well  motivated. The PDA Loss offers a new perspective on trajectory alignment.

## 3 Justification for technical correctness
The proposed technical pipeline  is theoretically feasible. The computation of temporal differencing and grouped convolutions in the TDModules is clearly described and fused with backbone via shortcut connections. This follows common feature enhancement practices. The multi level fusion and upsampling strategy draws from hourglass architectures could aggregate motion information at different granularities. The PDA Loss introduces a meaningful trajectory consistency constraint and adheres to standard loss function formulations. However, problems like computational complexity and data arrangement are not sufficiently analyzed.

## 4 Justification for experimental validation and reproducibility 
The paper conducts comprehensive experiments on EVE and EYEDIAP, and compares against multiple baselines, demonstrating the effectiveness of the proposed method, especially in dynamic environments. The ablation studies also validate the effectiveness of backbone modifications and PDA Loss. Training parameters and environments are reported in detail.
However, some limitations remain. The paper does not theoretically relate TDModule to traditional motion representations such as optical flow. In addition, the strategy for selecting the balancing coefficient in PDA Loss is not explained. During cross validation, the consistency of dataset variance is not verified.

## 5 Justification for clarity of presentation 
The paper is well structured, and the figures effectively illustrate architectural designs and implementation details. The qualitative analysis intuitively demonstrates the robustness of the model under different conditions.

## 6 Justification for references 
This paper comprehensively cites previous research and related contributions.

## 7 Justification for overall evaluation
This paper proposes RTDNet and PDA Loss to address the video gaze estimation problem. The RTDNet framework is novel and improves reliability in the video setting temporal differencing, grouped convolutions and cross-scale fusion. PDA Loss provides an insigntful approach to improving gaze trajectory consistency.
However, several aspects could be further improved. The TDModule could be compared with traditional motion representations such as optical flow. More detailed training analysis could be provided, including the impact of balancing coefficient ini PDA Loss, and the statistical analysis of the datasets. Overall, the paper demonstrates clear strengths in originality, technical design and clarity of presentation.


# Review 3
## 1 Justification for importance / relevance
This paper focuses on video gaze estimation, which has broad potential applications in human-computer interaction, virtual reality and related fields. It identifies two major limitations of prior work: most existing methods do not explicitly utilize inter-frame motion information but instead aggregate single-frame predictions. Such aggregation weakens trajectory consistency constraints during training. Addressing these issues is important for improving gaze estimation accuracy and is of practical value to ICME.

## 2 Justification for novelty / originality
The paper proposes a complete design for video gaze estimation, making substantial progress in both motion feature extraction and trajectory alignment. The TDModule performs temporal differencing at the feature level and applies sliding-window convolutions to produce more robust motion representations. A multi-level motion fusion is further designed, where deep motion features are upsampled and fused with shallow features and image features to form more effective representations. In addition, the PDA Loss aligns gaze trajectories by introducing the concept of trajectory parallelism, which is theoretically motivated and well suited to video data.
However, while these contributions improve gaze estimation accuracy, they are incremental. The PDA Loss is new, but the import of Transformer for temporal processing is not novel.

## 3 Justification for technical correctness
The technical descriptions and mathematical formulations are clear, and the module designs are internally consistent. The loss function strategy is logically feasible. Experiments are conducted on public datasets and compared with multiple baselines. To validate the PDA Loss, Procrustes distance is introduced with clear justification. Qualitative experiments are also provided to demonstrate robustness under different environments.
However, some technical limitations remain. The computational complexity of the recurrent network and Transformer is not analyzed, leaving efficiency unclear. The angular computation in the PDA Loss lacks discussion of potential challenges at large data scales.

## 4 Justification for experimental validation and reproducibility 
The experiments are comprehensive, with extensive evaluations on EVE and EYEDIAP and comparisons against multiple baselines. Ablation studies are provided for key components such as TDModule and PDA Loss. Qualitative visualization support claims of reduced jitter and enhanced robustness.
With respect to reproducibility, the paper reports training hyperparameters such as sequence length, Transformer dimensions, optimizer and learning rate. However, details of data preprocessing are missing, and the fold splitting strategy for EYEDIAP is not clearly described. Information about training time, required hardware and code accessibility is not disclosed.

## 5 Justification for clarity of presentation 
The paper is well structured, and the figures are well organized, Visual explanations of the PDA Loss effectively reduce the cognitive burden.
However, the PDA Loss primarily aligns trajectory or gaze direction vectors, and the use of term "Distribution" may introduce ambiguity.

## 6 Justification for references 
The paper provides sufficient references, covering both gaze estimation methods and common temporal modeling approaches, which adequately support the background and experimental design.

## 7 Justification for overall evaluation
This paper presents an innovative design combination for video gaze estimation, making substantive progress in motion feature extraction and trajectory alignment. The experimental design is thorough, and the method achieves competitive results on two public datasets, demonstrating its effectiveness. However, issues such as insufficient disclosure of data processing details, naming ambiguity of the PDA Loss, and incomplete reproducibility information remain. Addressing these issues would further strengthen the paper's validation and impact.