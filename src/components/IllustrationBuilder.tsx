import React from 'react';

// Props for custom illustrators
interface AvatarProps {
  avatarKey: string;
  customImage?: string;
  className?: string;
  shape?: '3x4' | 'circle';
}

// Custom Portrait SVGs designed to mimic the students and teachers with Brazilian national colors
export const StudentAvatar: React.FC<AvatarProps> = ({ avatarKey, customImage, className = "w-12 h-12", shape = 'circle' }) => {
  const isCircle = shape === 'circle';
  const shapeClass = isCircle ? 'rounded-full' : 'rounded-lg';

  if (customImage) {
    return (
      <div className={`relative overflow-hidden ${shapeClass} border-3 border-blue-600 bg-emerald-50 ${className}`}>
        <img
          src={customImage}
          alt="Avatar do aluno"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Fallback beautiful illustration based on specific key
  return (
    <div className={`relative overflow-hidden ${shapeClass} border-3 border-[#0047AB] bg-gradient-to-br from-[#009b3a] via-[#fedf00] to-[#002776] p-0.5 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full ${shapeClass} bg-emerald-900/40`}
        fill="currentColor"
      >
        <defs>
          <clipPath id={`${avatarKey}-${shape}-clip`}>
            {isCircle ? (
              <circle cx="50" cy="50" r="48" />
            ) : (
              <rect x="2" y="2" width="96" height="96" rx="10" />
            )}
          </clipPath>
        </defs>
        
        <g clipPath={`url(#${avatarKey}-${shape}-clip)`}>
          {/* Brazil/Cup decorative background stripes */}
          <circle cx="50" cy="50" r="48" fill="#009B3A" />
          <path d="M 0,20 L 100,80 L 100,100 L 0,40 Z" fill="#FEDF00" opacity="0.35" />
          <path d="M 0,70 Q 50,40 100,70 L 100,100 L 0,100 Z" fill="#002776" opacity="0.2" />

          {/* Rendering individual custom designs based on student/teacher features */}
          {(() => {
            switch (avatarKey) {
              case 'joao': // Black cap backward, brown skin, wide smile, yellow shirt
                return (
                  <g>
                    {/* Yellow/Green Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,75 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" /> {/* Collar */}
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#C68E62" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#C68E62" />
                    {/* Ears */}
                    <circle cx="31" cy="40" r="4" fill="#C68E62" />
                    <circle cx="69" cy="40" r="4" fill="#C68E62" />
                    {/* Backward Cap (Visor at the back / showing black crown and nice style) */}
                    <path d="M31,34 C31,20 69,20 69,34 C69,36 31,36 31,34 Z" fill="#111827" />
                    <circle cx="50" cy="22" r="2.5" fill="#111827" /> {/* Cap button */}
                    <path d="M38,20 C42,16 58,16 62,20 Z" fill="#192231" />
                    {/* Eyes */}
                    <circle cx="43" cy="38" r="2" fill="#111827" />
                    <circle cx="57" cy="38" r="2" fill="#111827" />
                    {/* Eyebrows */}
                    <path d="M39,34 Q43,32 47,34" stroke="#111827" strokeWidth="1.5" fill="none" />
                    <path d="M53,34 Q57,32 61,34" stroke="#111827" strokeWidth="1.5" fill="none" />
                    {/* Nose */}
                    <path d="M50,38 L50,43 Q50,45 48,45" stroke="#9A6237" strokeWidth="1.2" fill="none" />
                    {/* Big happy mouth / teeth */}
                    <path d="M40,46 C40,54 60,54 60,46 Z" fill="#7F1D1D" />
                    <path d="M42,47 C45,49 55,49 58,47 L58,46 L42,46 Z" fill="#FFFFFF" />
                  </g>
                );

              case 'maria_isabelly': // Red round glasses, black hair, brown skin, big smile
                return (
                  <g>
                    {/* Hair Back */}
                    <path d="M22,40 C 15,65 15,85 22,95 L78,95 C85,85 85,65 78,40 Z" fill="#090d16" />
                    {/* Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#B17A50" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#B17A50" />
                    {/* Long hair bangs */}
                    <path d="M31,30 C35,22 65,22 69,30 C69,35 60,35 50,32 C40,35 31,35 31,30 Z" fill="#090d16" />
                    {/* Eyes */}
                    <circle cx="43" cy="38" r="1.8" fill="#111827" />
                    <circle cx="57" cy="38" r="1.8" fill="#111827" />
                    {/* Red glasses */}
                    <circle cx="43" cy="38" r="6" stroke="#EF4444" strokeWidth="2.2" fill="none" />
                    <circle cx="57" cy="38" r="6" stroke="#EF4444" strokeWidth="2.2" fill="none" />
                    <line x1="49" y1="38" x2="51" y2="38" stroke="#EF4444" strokeWidth="2.2" />
                    <line x1="37" y1="38" x2="33" y2="36" stroke="#EF4444" strokeWidth="1.5" />
                    <line x1="63" y1="38" x2="67" y2="36" stroke="#EF4444" strokeWidth="1.5" />
                    {/* Smile */}
                    <path d="M42,47 Q50,54 58,47" stroke="#7F1D1D" strokeWidth="2.2" fill="none" />
                  </g>
                );

              case 'paula': // Long straight dark hair, cute tilted look
                return (
                  <g>
                    {/* Hair back */}
                    <path d="M22,35 C15,55 15,80 22,95 L78,95 C85,80 85,55 78,35 Z" fill="#1E1E1E" />
                    {/* Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#E2AC80" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#E2AC80" />
                    {/* Hair front draping */}
                    <path d="M32,27 C40,20 50,22 68,27 C68,45 64,55 64,62 C58,35 48,32 32,45 C32,40 32,30 32,27 Z" fill="#111827" />
                    {/* Eyes */}
                    <circle cx="44" cy="39" r="2" fill="#111827" />
                    <circle cx="56" cy="39" r="2" fill="#111827" />
                    {/* Cute smiling mouth */}
                    <path d="M44,48 Q50,53 56,48" stroke="#7F1D1D" strokeWidth="2" fill="none" />
                  </g>
                );

              case 'perola': // Short dark hair or tight braids
                return (
                  <g>
                    {/* Hair */}
                    <path d="M31,30 C31,18 69,18 69,30 C69,33 31,33 31,30 Z" fill="#1A1105" />
                    <circle cx="34" cy="24" r="5" fill="#1A1105" />
                    <circle cx="42" cy="20" r="5" fill="#1A1105" />
                    <circle cx="50" cy="18" r="5" fill="#1A1105" />
                    <circle cx="58" cy="20" r="5" fill="#1A1105" />
                    <circle cx="66" cy="24" r="5" fill="#1A1105" />
                    {/* Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#BD895E" />
                    {/* Face */}
                    <circle cx="50" cy="41" r="18" fill="#BD895E" />
                    {/* Eyes */}
                    <circle cx="43" cy="39" r="2" fill="#111827" />
                    <circle cx="57" cy="39" r="2" fill="#111827" />
                    {/* Nose */}
                    <path d="M50,38 L50,43" stroke="#87532B" strokeWidth="1.2" fill="none" />
                    {/* Gentle smile */}
                    <path d="M43,47 Q50,52 57,47" stroke="#7F1D1D" strokeWidth="2" fill="none" />
                  </g>
                );

              case 'rhillary': // Braided black hair, dark skin, sweet smile
                return (
                  <g>
                    {/* Dark skin */}
                    {/* Buns/Braids on sides */}
                    <circle cx="28" cy="28" r="8" fill="#111" />
                    <circle cx="72" cy="28" r="8" fill="#111" />
                    {/* Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#6B4123" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#6B4123" />
                    {/* Braids crown */}
                    <path d="M31,32 C33,24 67,24 69,32 Z" fill="#111" />
                    {/* Eyes */}
                    <circle cx="43" cy="39" r="2" fill="#000" />
                    <circle cx="57" cy="39" r="2" fill="#000" />
                    {/* Happy mouth */}
                    <path d="M41,47 C41,53 59,53 59,47 Z" fill="#7F1D1D" />
                    <path d="M43,47 Q50,49 57,47" stroke="#FFF" strokeWidth="1" fill="none" />
                  </g>
                );

              case 'willyan': // Short wavy light-brown hair, light skin, playful smile
                return (
                  <g>
                    {/* Hair waves behind */}
                    <path d="M30,30 Q50,15 70,30" stroke="#7C2D12" strokeWidth="8" fill="none" strokeLinecap="round" />
                    {/* Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#F3C39D" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#F3C39D" />
                    {/* Wavy Hair front */}
                    <path d="M31,31 Q40,20 52,24 Q62,20 69,31 L68,34 Q50,28 32,34 Z" fill="#7C2D12" />
                    {/* Eyes */}
                    <circle cx="43" cy="38" r="2" fill="#111827" />
                    <circle cx="57" cy="38" r="2" fill="#111827" />
                    {/* Broad smile */}
                    <path d="M41,46 Q50,54 59,46" stroke="#7F1D1D" strokeWidth="2.5" fill="none" />
                  </g>
                );

              case 'adriana': // Teacher - elegant wavy light-brown hair, green shirt
                return (
                  <g>
                    {/* Hair back */}
                    <path d="M23,35 C15,55 15,80 23,95 L77,95 C85,80 85,55 77,35 Z" fill="#9A3412" />
                    {/* Teacher Green Shirt */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#009B3A" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#FEDF00" /> {/* Yellow collar */}
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#FFDBBB" />
                    {/* Face */}
                    <circle cx="50" cy="38" r="18" fill="#FFDBBB" />
                    {/* Hair waves */}
                    <path d="M31,27 Q50,15 69,27" stroke="#7C2D12" strokeWidth="5" fill="none" />
                    <path d="M32,27 C34,44 38,50 34,55" stroke="#7C2D12" strokeWidth="4" fill="none" />
                    <path d="M68,27 C66,44 62,50 66,55" stroke="#7C2D12" strokeWidth="4" fill="none" />
                    {/* Gentle makeup eyes */}
                    <ellipse cx="43" cy="37" rx="2" ry="1.2" fill="#111" />
                    <ellipse cx="57" cy="37" rx="2" ry="1.2" fill="#111" />
                    <path d="M39,33 Q43,30 47,33" stroke="#111" strokeWidth="1.2" fill="none" />
                    <path d="M53,33 Q57,30 61,33" stroke="#111" strokeWidth="1.2" fill="none" />
                    {/* Kind bright smile */}
                    <path d="M42,45 C42,50 58,50 58,45" fill="#BE123C" />
                    <path d="M44,45.5 L56,45.5" stroke="#FFF" strokeWidth="1" />
                  </g>
                );

              case 'vanda': // Teacher - dark ponytail hair, green shirt
                return (
                  <g>
                    {/* Ponytail extension */}
                    <path d="M65,40 Q85,50 80,75 C75,70 65,55 65,40 Z" fill="#1F2937" />
                    {/* Green Jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#009B3A" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#FEDF00" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#EFA282" />
                    {/* Face */}
                    <circle cx="50" cy="38" r="18" fill="#EFA282" />
                    {/* Hair crown */}
                    <path d="M31,30 C31,18 69,18 69,30 Z" fill="#111827" />
                    {/* Red elastic hair band */}
                    <circle cx="65" cy="38" r="3.5" fill="#EF4444" />
                    {/* Eyes */}
                    <circle cx="43" cy="36" r="2" fill="#111827" />
                    <circle cx="57" cy="36" r="2" fill="#111827" />
                    {/* Friendly Smile */}
                    <path d="M43,46 Q50,51 57,46" stroke="#991B1B" strokeWidth="2.2" fill="none" />
                  </g>
                );

              case 'edilaine': // Teacher - longer curly brown hair, green shirt
                return (
                  <g>
                    {/* Curly hair blobs */}
                    <circle cx="28" cy="36" r="8" fill="#451A03" />
                    <circle cx="25" cy="46" r="8" fill="#451A03" />
                    <circle cx="28" cy="56" r="8" fill="#451A03" />
                    <circle cx="72" cy="36" r="8" fill="#451A03" />
                    <circle cx="75" cy="46" r="8" fill="#451A03" />
                    <circle cx="72" cy="56" r="8" fill="#451A03" />
                    {/* Green Jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#009B3A" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#FEDF00" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#E0926C" />
                    {/* Face */}
                    <circle cx="50" cy="38" r="18" fill="#E0926C" />
                    {/* Front hair curls */}
                    <path d="M31,28 C35,22 65,22 69,28" stroke="#451A03" strokeWidth="4" fill="none" />
                    {/* Eyes */}
                    <circle cx="42" cy="36" r="2" fill="#111827" />
                    <circle cx="58" cy="36" r="2" fill="#111827" />
                    {/* Warm mouth */}
                    <path d="M42,45 C42,50 58,50 58,45 Z" fill="#9F1239" />
                  </g>
                );

              case 'rayssa': // Teacher - short styled black coiled curls
                return (
                  <g>
                    {/* Textured curly hair crown */}
                    <path d="M30,30 Q50,12 70,30" stroke="#000" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <circle cx="34" cy="24" r="4.5" fill="#111" />
                    <circle cx="42" cy="18" r="4.5" fill="#111" />
                    <circle cx="50" cy="16" r="4.5" fill="#111" />
                    <circle cx="58" cy="18" r="4.5" fill="#111" />
                    <circle cx="66" cy="24" r="4.5" fill="#111" />
                    {/* Green Jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#009B3A" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#FEDF00" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#8C5230" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#8C5230" />
                    {/* Eyebrows */}
                    <path d="M39,34 Q43,32 47,34" stroke="#000" strokeWidth="1.5" fill="none" />
                    <path d="M53,34 Q57,32 61,34" stroke="#000" strokeWidth="1.5" fill="none" />
                    {/* Eyes */}
                    <ellipse cx="43" cy="38" rx="2" ry="1.5" fill="#000" />
                    <ellipse cx="57" cy="38" rx="2" ry="1.5" fill="#000" />
                    {/* Smile */}
                    <path d="M42,47 Q50,53 58,47" stroke="#7F1D1D" strokeWidth="2.2" fill="none" />
                  </g>
                );

              case 'craque_leitura': // Book & soccer sparkles sticker
                return (
                  <g>
                    {/* Background gold badge */}
                    <polygon points="50,5 92,25 92,75 50,95 8,75 8,25" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3" />
                    {/* Open Book */}
                    <path d="M22,50 C35,42 48,46 50,52 C52,46 65,42 78,50 L78,74 C65,66 52,70 50,76 C48,70 35,66 22,74 Z" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
                    <path d="M50,52 L50,76" stroke="#475569" strokeWidth="2" />
                    <path d="M25,56 H45 M25,62 H45 M25,68 H45 M55,56 H75 M55,62 H75 M55,68 H75" stroke="#94A3B8" strokeWidth="1.5" />
                    {/* Sparkly soccer ball emerging */}
                    <circle cx="50" cy="33" r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                    {/* Soccer pentagons */}
                    <polygon points="50,25 54,28 52,32 48,32 46,28" fill="#0F172A" />
                    <polygon points="41,31 43,35 39,37 36,34 37,31" fill="#0F172A" />
                    <polygon points="59,31 63,31 64,34 61,37 57,35" fill="#0F172A" />
                    <line x1="50" y1="25" x2="50" y2="21" stroke="#0F172A" strokeWidth="1.5" />
                    <line x1="41" y1="31" x2="38" y2="28" stroke="#0F172A" strokeWidth="1.5" />
                    <line x1="59" y1="31" x2="62" y2="28" stroke="#0F172A" strokeWidth="1.5" />
                    {/* Sparkles */}
                    <path d="M18,22 L22,22 M20,20 L20,24" stroke="#FEDF00" strokeWidth="2" strokeLinecap="round" />
                    <path d="M80,22 L84,22 M82,20 L82,24" stroke="#FEDF00" strokeWidth="2" strokeLinecap="round" />
                  </g>
                );

              case 'assiduo': // Blue calendar medal
                return (
                  <g>
                    {/* Circle badge */}
                    <circle cx="50" cy="50" r="42" fill="#10B981" stroke="#047857" strokeWidth="3" />
                    {/* Calendar card shape */}
                    <rect x="28" y="24" width="44" height="42" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
                    {/* Red top tier card */}
                    <path d="M28,26 C28,24 32,24 32,24 L68,24 C68,24 72,24 72,26 L72,34 L28,34 Z" fill="#EF4444" />
                    {/* Binder ring holes */}
                    <circle cx="38" cy="24" r="3.5" fill="#1E293B" />
                    <circle cx="62" cy="24" r="3.5" fill="#1E293B" />
                    <circle cx="38" cy="24" r="1.8" fill="#F8FAFC" />
                    <circle cx="62" cy="24" r="1.8" fill="#F8FAFC" />
                    {/* Checkmarks inside calendar */}
                    <path d="M35,46 L40,51 L51,40" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M47,56 L51,60 L61,50" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Gold Star badge corner */}
                    <path d="M15,75 L21,60 L36,63 L24,73 L28,88 Z" fill="#F59E0B" opacity="0.9" />
                  </g>
                );

              case 'fifa_logo': // World Cup Trophy / 2026 FIFA
                return (
                  <g>
                    {/* Deep Blue background */}
                    <rect x="10" y="10" width="80" height="80" rx="10" fill="#030712" stroke="#FEDF00" strokeWidth="3" />
                    {/* Yellow Glow */}
                    <circle cx="50" cy="45" r="22" fill="#FEDF00" opacity="0.15" />
                    {/* Trophy shape */}
                    <path d="M50,80 L52,70 L58,68 L50,52 L56,42 Q60,35 60,30 Q60,20 50,20 Q40,20 40,30 Q40,35 44,42 L50,52 L42,68 L48,70 Z" fill="#F59E0B" stroke="#FEDF00" strokeWidth="2.2" />
                    {/* FIFA base block */}
                    <rect x="38" y="72" width="24" height="10" rx="1.5" fill="#FEDF00" />
                    {/* Soccer ball on top */}
                    <circle cx="50" cy="26" r="8" fill="#FEDF00" />
                  </g>
                );

              case 'endrick': // Endrick avatar representation
                return (
                  <g>
                    {/* Yellow stars jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#4B2D19" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#4B2D19" />
                    {/* Trendy low-fade hair */}
                    <path d="M31,34 C31,18 69,18 69,34 C69,35 31,35 31,34 Z" fill="#000000" />
                    <path d="M31,34 M31,36 M69,34 M69,36" stroke="#000" strokeWidth="1" />
                    {/* Eyes */}
                    <circle cx="43" cy="39" r="1.8" fill="#FFFFFF" />
                    <circle cx="57" cy="39" r="1.8" fill="#FFFFFF" />
                    <circle cx="43" cy="39" r="1" fill="#111" />
                    <circle cx="57" cy="39" r="1" fill="#111" />
                    {/* Smiley mouth */}
                    <path d="M43,47 Q50,51 57,47" stroke="#000" strokeWidth="2" fill="none" />
                  </g>
                );

              case 'vini_jr': // Vini Jr avatar
                return (
                  <g>
                    {/* Yellow stars jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#52321B" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#52321B" />
                    {/* Custom high taper buzz cut style */}
                    <path d="M31,31 C31,16 69,16 69,31 C69,34 31,34 31,31 Z" fill="#111827" />
                    {/* Cool mini mohawk spikes top */}
                    <path d="M44,16 Q50,11 56,16" stroke="#111" strokeWidth="3" fill="none" />
                    {/* Eyes */}
                    <circle cx="43" cy="38" r="1.8" fill="#111827" />
                    <circle cx="57" cy="38" r="1.8" fill="#111827" />
                    {/* Nose and broad smiling lips */}
                    <ellipse cx="50" cy="42" rx="3" ry="1.5" fill="#3D2312" />
                    <path d="M41,46 Q50,53 59,46" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                  </g>
                );

              case 'neymar': // Neymar avatar
                return (
                  <g>
                    {/* Yellow stars jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FEDF00" />
                    <path d="M38,68 C45,75 55,75 62,68 Z" fill="#009B3A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#B48259" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#B48259" />
                    {/* Bleached/styled pointy hair */}
                    <path d="M31,30 Q50,6 69,30 Z" fill="#CA8A04" /> {/* Yellow blonde styled crown */}
                    <path d="M31,30 C31,34 69,34 69,30 Z" fill="#78350F" /> {/* Brown roots */}
                    {/* Stylish Beard */}
                    <path d="M33,42 Q50,59 67,42 L65,46 Q50,61 35,46 Z" fill="#111827" />
                    {/* Eyes */}
                    <circle cx="43" cy="38" r="1.8" fill="#111827" />
                    <circle cx="57" cy="38" r="1.8" fill="#111827" />
                    {/* Smile */}
                    <path d="M43,46 C45,49 55,49 57,46" stroke="#FFF" strokeWidth="1" fill="none" />
                  </g>
                );

              case 'mbappe': // Mbappé short buzzcut avatar
                return (
                  <g>
                    {/* Dark/French jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#1E3A8A" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#EF4444" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#58351B" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#58351B" />
                    {/* Super tight black buzzcut */}
                    <path d="M31,32 C31,18 69,18 69,32 Z" fill="#111827" />
                    {/* Eyes - funny round gaze */}
                    <circle cx="42" cy="37" r="2.5" fill="#FFFFFF" />
                    <circle cx="58" cy="37" r="2.5" fill="#FFFFFF" />
                    <circle cx="42" cy="37" r="1.2" fill="#000000" />
                    <circle cx="58" cy="37" r="1.2" fill="#000000" />
                    {/* Distinct smile */}
                    <path d="M42,46 Q50,51 58,46" stroke="#000" strokeWidth="1.8" fill="none" />
                  </g>
                );

              case 'cr7': // Cristiano Ronaldo slicked back slick look
                return (
                  <g>
                    {/* Sporty Jersey red/green */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#DC2626" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#16A34A" />
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#FCD34D" opacity="0.4" /> {/* Tan skin */}
                    <rect x="44" y="55" width="12" height="15" fill="#F3A575" />
                    {/* Face */}
                    <path d="M32,40 C32,30 42,22 50,22 C58,22 68,30 68,40 C68,52 58,58 50,58 C42,58 32,52 32,40 Z" fill="#F3A575" />
                    {/* Slick dark hair with shaved line side */}
                    <path d="M32,32 C34,22 40,16 54,16 Q66,16 68,30 L64,28 Q50,18 36,31 Z" fill="#0F172A" />
                    {/* Sharp Eyebrows */}
                    <path d="M38,32 L46,31" stroke="#000" strokeWidth="2.2" />
                    <path d="M54,31 L62,32" stroke="#000" strokeWidth="2.2" />
                    {/* Eyes - intense look */}
                    <circle cx="42" cy="36" r="1.8" fill="#111827" />
                    <circle cx="58" cy="36" r="1.8" fill="#111827" />
                    {/* Confident smirk */}
                    <path d="M42,46 L58,46 Q50,54 42,46" fill="#F3A575" stroke="#7F1D1D" strokeWidth="1.8" />
                  </g>
                );

              case 'messi': // Lionel Messi bearded smiley face
                return (
                  <g>
                    {/* Argentine Sky Blue/White striped Jersey */}
                    <path d="M20,95 C20,75 35,68 50,68 C65,68 80,95 80,95 Z" fill="#FFFFFF" />
                    <path d="M28,75 L28,95 M38,70 L38,95 M48,68 L48,95 M58,70 L58,95 M68,75 L68,95" stroke="#38BDF8" strokeWidth="4" />
                    <path d="M38,68 C45,74 55,74 62,68 Z" fill="#FEDF00" /> {/* Gold collar accent */}
                    {/* Neck */}
                    <rect x="44" y="55" width="12" height="15" fill="#EFA57C" />
                    {/* Face */}
                    <circle cx="50" cy="40" r="18" fill="#EFA57C" />
                    {/* Brown styled hair */}
                    <path d="M31,30 C31,18 69,18 69,30 C69,32 31,32 31,30 Z" fill="#78350F" />
                    <path d="M31,30 Q36,15 48,18 Q55,15 69,28 Z" fill="#78350F" />
                    {/* Friendly Reddish-Brown Beard */}
                    <path d="M32,40 C32,54 50,60 68,40 L65,44 C65,56 50,58 35,44 Z" fill="#9A3412" />
                    <rect x="42" y="47" width="16" height="5" rx="1" fill="#9A3412" />
                    {/* Eyes - warm eyes */}
                    <circle cx="43" cy="37" r="2" fill="#111827" />
                    <circle cx="57" cy="37" r="2" fill="#111827" />
                    {/* Gentle smile */}
                    <path d="M43,45 Q50,50 57,45" stroke="#FFF" strokeWidth="1.2" fill="none" />
                  </g>
                );

              default: // General default soccer ball badge
                return (
                  <g>
                    <circle cx="50" cy="50" r="42" fill="#FFFFFF" stroke="#009B3A" strokeWidth="3" />
                    <circle cx="50" cy="50" r="32" fill="none" stroke="#FEDF00" strokeWidth="2" />
                    {/* Soccer pentagon structure */}
                    <polygon points="50,38 58,44 55,54 45,54 42,44" fill="#1E293B" />
                    <line x1="50" y1="38" x2="50" y2="24" stroke="#1E293B" strokeWidth="2" />
                    <line x1="58" y1="44" x2="70" y2="40" stroke="#1E293B" strokeWidth="2" />
                    <line x1="55" y1="54" x2="62" y2="66" stroke="#1E293B" strokeWidth="2" />
                    <line x1="45" y1="54" x2="38" y2="66" stroke="#1E293B" strokeWidth="2" />
                    <line x1="42" y1="44" x2="30" y2="40" stroke="#1E293B" strokeWidth="2" />
                  </g>
                );
            }
          })()}
        </g>
      </svg>
    </div>
  );
};
