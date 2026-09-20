"""
Expande a simetria cristalina de um arquivo CIF (ex.: Greenockite do RRUFF)
gerando um novo CIF "P1" com todos os átomos da cela unitária já explícitos,
pronto para ser lido corretamente pelo 3Dmol.js (que não expande simetria
automaticamente).

Por padrão, não expande a cela (supercélula 1x1x1, ou seja, só a cela unitária).

Uso:
    pip install pymatgen --break-system-packages
    python expand_cif_symmetry.py entrada.cif saida.cif
    python expand_cif_symmetry.py entrada.cif saida.cif 2 2 2   # supercélula customizada
"""

import sys
from pymatgen.core import Structure
from pymatgen.io.cif import CifWriter

DEFAULT_SUPERCELL = [1, 1, 1]


def expand_cif(input_path: str, output_path: str, supercell=None):
    if supercell is None:
        supercell = DEFAULT_SUPERCELL

    # Lê a estrutura, já resolvendo o grupo espacial e as posições de Wyckoff
    structure = Structure.from_file(input_path)

    print(f"Fórmula: {structure.composition.reduced_formula}")
    print(f"Grupo espacial detectado: {structure.get_space_group_info()}")
    print(f"Átomos na cela unitária (P1, expandido): {len(structure)}")

    structure = structure * supercell
    print(f"Supercélula {supercell} -> {len(structure)} átomos")

    # symprec=None e um CifWriter padrão gravam em P1 (sem operações de
    # simetria implícitas), ou seja, todos os átomos já posicionados.
    writer = CifWriter(structure, symprec=None)
    writer.write_file(output_path)
    print(f"CIF expandido salvo em: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python expand_cif_symmetry.py <entrada.cif> <saida.cif> [nx ny nz]")
        sys.exit(1)

    input_cif = sys.argv[1]
    output_cif = sys.argv[2]
    supercell = None
    if len(sys.argv) == 6:
        supercell = [int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])]

    expand_cif(input_cif, output_cif, supercell)