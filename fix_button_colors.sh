#!/bin/bash

# Files to fix
files=(
  "src/components/DalSiAIPage.jsx"
  "src/components/EnhancedChatInterface.jsx"
  "src/components/ExperienceNav.jsx"
  "src/components/Footer.jsx"
  "src/components/Navigation.jsx"
  "src/components/PricingSection.jsx"
  "src/components/QuickMenu.jsx"
  "src/components/models/DalsiAIModelPage.jsx"
  "src/components/models/DalsiAIVdModelPage.jsx"
  "src/components/models/DalsiAIViModelPage.jsx"
  "src/components/HomePage.jsx"
  "src/components/HeroSection.jsx"
  "src/components/SolutionsSection.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Add text-white to buttons with bg-primary that don't already have it
    sed -i 's/className="\([^"]*\)bg-primary\([^"]*\)"/className="\1bg-primary\2 text-white"/g' "$file"
    sed -i 's/className="\([^"]*\)bg-purple\([^"]*\)"/className="\1bg-purple\2 text-white"/g' "$file"
    
    # Remove duplicate text-white
    sed -i 's/text-white text-white/text-white/g' "$file"
    sed -i 's/text-white  text-white/text-white/g' "$file"
    
    # Fix className with multiple spaces
    sed -i 's/  / /g' "$file"
  fi
done

echo "✅ All button colors fixed!"
